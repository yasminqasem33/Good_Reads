const express = require('express')


const userRouter = express.Router()

userRouter.get('/',(req,res)=>{
    res.render('pages/userHome.ejs')
})
userRouter.get('/books/bookid',(req,res)=>{
    res.render('pages/bookid.ejs')
})
userRouter.get('/books/userHome',(req,res)=>{
    res.redirect('/user')
})

module.exports=userRouter
