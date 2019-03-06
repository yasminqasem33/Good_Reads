const express = require('express')


const userRouter = express.Router()
userRouter.get('/categories', (req,res)=>
{
    res.render('pages/usercategories.ejs')

})

userRouter.get('/',(req,res)=>{
    res.render('pages/userHome.ejs')
})

userRouter.get('/category', (req, res) =>{
    res.redirect('/user')
})
module.exports=userRouter
