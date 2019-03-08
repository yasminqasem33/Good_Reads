
const express = require('express')
const userRouter = express.Router()
const categoryModel = require('../models/categoryModel')
const bookmodel = require('../models/bookModel')

userRouter.get('/categories', (req, res) => {

    categoryModel.find()
        .then((categories) => {
            res.render('pages/usercategories.ejs',
                {
                    categories: categories
                })

        })
const userModel = require('../models/userModel')
const userRouter = express.Router()
userRouter.get('/categories', (req,res)=>
{
    res.render('pages/usercategories.ejs')

})
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
});


// userRouter.get('/categories', (req,res)=>
// {
//     res.render('pages/usercategories.ejs')

// })
// userRouter.get('/categories/:categoryid/eco1', (req, res) =>{
//     res.render('pages/eco1.ejs')
// })

userRouter.get('/userhome', (req, res) => {
userRouter.get('/',(req,res)=>{
    res.render('pages/homepage.ejs')
})


userRouter.get('/signin',(req,res)=>{
    res.render('pages/usersignin.ejs')
})


userRouter.post('/userhome',(req,res)=>{
    res.render('pages/userHome.ejs');

})

// userRouter.get('/categories/:categoryid/art1', (req, res) =>{
//     res.render('pages/art1.ejs')
// })

userRouter.get('/', (req, res) => {
    res.render('pages/homepage.ejs')
})
userRouter.get('/books/bookid', (req, res) => {


userRouter.post('/',(req,res)=>{
    if(req.body.psw === req.body.psw-repeat)
    {
        userModel.create({
            firstName: req.body.FirstName,
            lastName: req.body.LastName,
            email: req.body.email,
            userpassword: getSHA1ofJSON(req.body.psw),
            userImage:"sdds"
        })
        .then ((usr)=>{
            res.redirect('/user')
            console.log(usr)
    
        })
    }
    else
    {
        console.log("false password")
    }
})

userRouter.post('/',(req,res)=>{
userModel.find({firstName : req.body.uname},{userpassword:getSHA1ofJSON(req.body.pass)}, function(err, data){
    if(err){
        console.log("false password")
    }
 

})
})

userRouter.get('/books/bookid',(req,res)=>{
    res.render('pages/bookid.ejs')
})
userRouter.get('/books/userHome', (req, res) => {
    res.redirect('/user')
})

userRouter.post('/', (req, res) => {
    if (req.body.uname == "dina" && req.body.psw == "12345") {
        res.redirect('/user/userhome')
    }
})

userRouter.get('/categories/:id', (req, res) => {
    res.render('/pages/')
userRouter.post('/',(req,res)=>
 {
    if(req.body.uname=="dina" && req.body.psw=="12345")
    {
        res.redirect('/user/userHome')     
    }
})

var getSHA1ofJSON = function(input){
    return crypto.createHash('sha1').update(JSON.stringify(input)).digest('hex')
}

module.exports = userRouter
