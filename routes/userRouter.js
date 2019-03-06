const express = require('express')


const userRouter = express.Router()

userRouter.get('/userhome',(req,res)=>{
    res.render('pages/userHome.ejs');
    req.body.loginname="dina";
})

userRouter.get('/',(req,res)=>{
    res.render('pages/homepage.ejs')
})

userRouter.post('/',(req,res)=>
 {
    if(req.body.uname=="dina" && req.body.psw=="12345")
    {
        res.redirect('user/userhome')     
    }
})


module.exports=userRouter
