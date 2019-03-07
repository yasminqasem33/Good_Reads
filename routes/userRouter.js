const express = require('express')
const userModel = require('../models/userModel')
const userRouter = express.Router()
userRouter.get('/categories', (req,res)=>
{
    res.render('pages/usercategories.ejs')

})
userRouter.get('/categories/1', (req, res) =>{
    res.render('pages/1.ejs')
})
userRouter.get('/categories/2', (req, res) =>{
    res.render('pages/2.ejs')
})
userRouter.get('/categories/3', (req, res) =>{
    res.render('pages/3.ejs')
})

userRouter.get('/',(req,res)=>{
    res.render('pages/homepage.ejs')
})

userRouter.get('/userhome',(req,res)=>{
    res.render('pages/userHome.ejs');
    
})



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
        console.log("fslse password")
    }
   
})




userRouter.get('/books/bookid',(req,res)=>{
    res.render('pages/bookid.ejs')
})
userRouter.get('/books/userHome',(req,res)=>{
    res.redirect('/user')
})


userRouter.get('/category', (req, res) =>{
    res.redirect('/user')
})

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

module.exports=userRouter
