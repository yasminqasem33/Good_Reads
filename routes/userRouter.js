const express = require('express')


const userRouter = express.Router()

userRouter.get('/userhome',(req,res)=>{
    res.render('pages/userhome.ejs')
})

userRouter.get('/',(req,res)=>{
    res.render('pages/homepage.ejs')
})

module.exports=userRouter
