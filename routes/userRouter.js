
const express = require('express')
var expressValidator = require('express-validator');
const userRouter = express.Router()
var bodyParser = require('body-parser')
require('../server');
userRouter.use(expressValidator())
const userModel = require('../models/userModel')
const categoryModel = require('../models/categoryModel')
const bookmodel = require('../models/bookModel')
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');
var authenticate = require('../authenticate');
require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
exports.local=passport.use(new LocalStrategy(userModel.authenticate()))
userRouter.use(passport.initialize());
const autherModel = require('../models/authorModel')

userRouter.get('/hpage/all', (req, res) => {   //this URL is just user for test. It can be changed.
    bookmodel.find().then((books) => {
        // res.send(books);
        books.forEach(book=>{
            autherModel.findById(book.authorId).then(author=>{
                res.render('pages/userHome.ejs', {
                    books:books,
                    author: author.first_name+" "+author.last_name
                })
                // console.log(author.first_name+" "+author.last_name);
            })
        })
    })
})



userRouter.get('/categories', (req, res) => {
userRouter.use(passport.initialize());
userRouter.use(passport.session());


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


userRouter.get('/userhome',(req,res)=>{
    res.render('pages/userHome.ejs');
    
userRouter.get('/categories/:id', (req, res, next) => {
    bookmodel.findOne({ categoryId: req.params.id }).then((record) => {
        categoryModel.findById(req.params.id).then((name) => {

            res.render('pages/eco1.ejs',
                {
                    name: name,
                    record: record
                })
            console.log(record)
        })
    })
})


// userRouter.get('/categories/:categoryid/eco1', (req, res) =>{
//     res.render('pages/eco1.ejs')
// })








// userRouter.get('/categories/:categoryid/art1', (req, res) =>{
//     res.render('pages/art1.ejs')
// })

userRouter.get('/', (req, res) => {
res.render("pages/homepage.ejs")
})


userRouter.post('/', (req, res) => {
    const errors = req.validationErrors(req);
    if (errors) {
        console.log("error in sign up page ")
        res.json(errors);
        res.redirect('/')
    } else {
        console.log("1");
    
    userModel.register(new userModel({username:req.body.email,email:req.body.email,firstName: req.body.firstName, lastName:req.body.lastName}),req.body.psw, (err ,user)=>{
        if(err){
        res.json({err})
        }
        else{
          passport.authenticate('local')(req, res, ()=>{
              res.json ({succses:"scssess"})
          })

        }
    }
    )}})
    

userRouter.get('/signin', (req, res) => {
    res.render('pages/usersignin.ejs')
})


userRouter.get('/signin/', passport.authenticate('local'), (req, res) => {
    res.render('pages/userHome.ejs')
})

userRouter.post('/signin', passport.authenticate('local'), (req, res) => {
    var token = authenticate.getToken({ email: req.body.email});
     token="Authintication: Bearer "+token
     localStorage.setItem("token,token")
     res.render("pages/userHome",token)
    console.log(token)
    res.send({
        message: "Authintication: Bearer "+
        token
    });
    res.json({
        token: "Bearer " + token
        });
        res.se
    req.header("Authintication: Bearer "+
    token)
});



userRouter.post('/signin/:id/userhome/logout',(req,res)=>{
    userModel.updateOne({_id: req.params._id}, ({state:'offline'}), function(err, raw) {
        if (err) {
          res.send(err);
        }  
        else{
          res.redirect('/signin')  
        }
    }); 
})
    res.render('/pages/')
})




var getSHA1ofJSON = function (input) {
    return crypto.createHash('sha1').update(JSON.stringify(input)).digest('hex')
}

module.exports = userRouter
