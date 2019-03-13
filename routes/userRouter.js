const express = require('express')
var expressValidator = require('express-validator');
const userRouter = express.Router()
var bodyParser = require('body-parser')
userRouter.use(expressValidator())
const userModel = require('../models/userModel')
const categoryModel = require('../models/categoryModel')
const bookmodel = require('../models/bookModel')
const jwt = require('jsonwebtoken');
const passport = require('passport');
var authenticate = require('../authenticate');
require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
exports.local=passport.use(new LocalStrategy(userModel.authenticate()))
userRouter.use(passport.initialize());
const autherModel = require('../models/authorModel')


//==================================================================================
userRouter.get('/', (req, res) => {
     res.render("pages/usersignup.ejs")
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
    )}
})
    
userRouter.get('/login', (req, res) => {
    res.render('pages/login.ejs')
})

userRouter.post('/login', passport.authenticate('local'), (req, res) => {
    var token = authenticate.getToken({ email: req.body.email});
     token="Authintication: Bearer "+token
    res.json({
        token: "Bearer " + token
        });
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