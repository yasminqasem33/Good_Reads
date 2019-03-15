const express = require('express')
var expressValidator = require('express-validator');
const userRouter = express.Router()
var bodyParser = require('body-parser')
const bcrypt=require('bcrypt')
userRouter.use(expressValidator())
const userModel = require('../models/userModel')
const categoryModel = require('../models/categoryModel')
const bookmodel = require('../models/bookModel')
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');
require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
userRouter.use(passport.initialize());
const cookieParser = require('cookie-parser')
userRouter.use(cookieParser());
const autherModel = require('../models/authorModel')


//==================================================================================
userRouter.get('/', (req, res) => {
    res.render("pages/usersignup.ejs")
})
userRouter.post('/', (req, res) => {

   req.checkBody('FirstName', 'First name must be specified.').notEmpty();
   req.checkBody('LastName', 'Last name must be specified.').notEmpty();
   req.checkBody('psw', 'Password must be specified.').notEmpty();
   req.checkBody('email', 'email must be specified.').notEmpty();
   req.checkBody('email', 'email must be valied email.').isEmail();

   const errors = req.validationErrors(req);
   if (errors) {
       console.log("error in sign up page ")
       res.json(errors);
       res.redirect('/')
   } else {
       console.log("1");
       userModel.findOne({ email: req.body.email }).then(user => {
           if (user) {
               return res.status(400).json({ email: 'Email already exists' });
           } else {
               if(req.body.psw != req.body.pswrepeat)
               {
               return res.status(400).json({ password: 'password does not match' });
               }
               else{
               console.log("2");
               const newUser = new userModel({
                   firstName: req.body.FirstName,
                   lastName: req.body.LastName,
                   email: req.body.email,
                   password: req.body.psw
               });
               console.log("3");
               bcrypt.genSalt(10, (err, salt) => {
                   bcrypt.hash(newUser.password, salt, (err, hash) => {
                       if (err)
                       newUser.password = hash;
                       console.log("4");
                       console.log(newUser);
                       newUser.save()
                           .then(user => {
                               console.log("5")
                               res.redirect('/login')

                           })
                           .catch(err => console.log(err));
                   });
               });
           }}
       });
   }
});

   
userRouter.get('/login', (req, res) => {
   res.render('pages/login.ejs')
})


userRouter.post('/login', (req, res) => {
   const email = req.body.email;
   const password = req.body.pass;

   req.checkBody('email', 'Email is required !').notEmpty();
   req.checkBody('email', 'Email is incorrect !').isEmail();
   req.checkBody('pass', 'Password is required !').notEmpty();

   const errors = req.validationErrors(req);
   if (errors) {
       console.log("error in Login ");
       res.json(errors);
       return;
   } else {
       userModel.findOne({ email: email })
           .then(user => {
               if (!user) {
                   res.status(404).json({ email: 'email not found' });
               } else {
                   bcrypt.compare(password, user.password)
                       .then(isMatched => {
                           if (isMatched) {

                               const payload = {
                                   _id: user._id,
                                   firstName: user.firstName,
                                   lastName: user.lastName,
                                   email: user.email,
                                   userImage: user.userImage
                               };

                               jwt.sign(payload, keys.secretOrKey, { expiresIn: 36 }, (err, token) => {
                                   if(err){
                                    res.redirect('/login')
                                   }
                                  else if (!err) {
                                //     console.log(token)
                                   
                                 var toke=token
                                 let auth={
                                   userdata: payload,
                                   token: toke
                               }
                             res.cookie("userData", auth); 
                                 res.redirect('/getuser')
                               
                            //    res.json({
                            //        success: true,
                            //        token: token
                            //    })

                                   } else {
                                       res.json({ err: err });
                                   }
                               });
                      
                           } else {
                               res.status(400).json({ password: 'password incorrect' });
                           }
                       })
               }
           });
   }
});



userRouter.use(function(req,res,next)
{
  // var token =req.body.token || req.query.token || req.headers['x-access-token'];
  const token= req.cookies.userData.token 
// var token = req.headers['x-access-token'] || req.cookies.userData.token
   if (token){
       jwt.verify(token,keys.secretOrKey,function(err,decoded){
           if (err){
             //  res.clearCookie('userData')
               res.redirect('/')

           }
           req.decoded=decoded;
           next();
       })
   }
   else{
       res.redirect('/')
   }
})
   

   userRouter.get('/getuser', (req, res,next)=>{  
    
     res.redirect('/hpage/all')
 // jwt.verify(token,keys.secretOrKey,function(err,decoded){
 //  req.decoded=decoded
   //    res.redirect('/')
 //  if(err)
 //  {
 
//   }
 //      })
   //shows all the cookies 
   });

  
//=========================================================================================


userRouter.get('/categories/:id/eco2', (req, res, next) => {
    categoryModel.findById(req.params.id).then((name) => {
        bookmodel.find({ categoryId: req.params.id }).then((record) => {
            console.log(record)
            autherModel.find({id:record.authorId}).then((author)=>{
        res.render('pages/eco2.ejs',
            {
                name: name,
                record: record,
                author: author
            })
        }).catch(err=>console.log(err))
    
    // })
})
}).catch(console.log)

})


userRouter.get('/categories/:id', (req, res, next) => {
        categoryModel.findById(req.params.id).then((name) => {
            bookmodel.find({ categoryId: req.params.id }).then((record) => {
                console.log(record)
                autherModel.find({id:record.authorId}).then((author)=>{
            res.render('pages/eco1.ejs',
                {
                    name: name,
                    record: record,
                    author: author
                })
            }).catch(err=>console.log(err))
        
        // })
    })
}).catch(console.log)

})


// userRouter.get('/hpage/all', (req, res) => {   //this URL is just user for test. It can be changed.
//     bookmodel.find().then((books) => {
//         // res.send(books);
//         books.forEach(book=>{
//             autherModel.findById(book.authorId).then(author=>{
//                 res.render('pages/userHome.ejs', {
//                     books:books,
//                     author: author.first_name+" "+author.last_name
//                 })
//                 // console.log(author.first_name+" "+author.last_name);
//             })
//         })
//     })
// })

userRouter.get('/hpage/all', (req, res) => {
    userRouter.find().then(users=>{
        res.send(users.book)
})
})

userRouter.get('/categories', (req, res) => {

    categoryModel.find()
        .then((categories) => {
            res.render('pages/usercategories.ejs',
                {
                    categories: categories
                })
        })
})

userRouter.get('/categories', (req, res) => {
    res.render('pages/usercategories.ejs')
})







userRouter.get('/hpage/read', (req, res) =>{
    res.render('pages/userread.ejs')
})









module.exports = userRouter