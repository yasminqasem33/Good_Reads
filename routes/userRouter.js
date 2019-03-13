
const express = require('express')
var expressValidator = require('express-validator');
const userRouter = express.Router()
var bodyParser = require('body-parser')
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
    )}})
    

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



module.exports = userRouter
