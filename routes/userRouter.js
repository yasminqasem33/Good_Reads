const express = require('express')


const userRouter = express.Router()

userRouter.get('/userhome',(req,res)=>{
    res.render('pages/userhome.ejs')
})

userRouter.get('/',(req,res)=>{
    res.render('pages/homepage.ejs')
})
userRouter.get('/books/bookid',(req,res)=>{
    res.render('pages/bookid.ejs')
})
userRouter.get('/books/userHome',(req,res)=>{
    res.redirect('/user')
})

module.exports=userRouter
