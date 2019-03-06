const express = require('express')


const userRouter = express.Router()

userRouter.get('/userhome',(req,res)=>{
    res.render('pages/userHome.ejs');
    
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

userRouter.post('/',(req,res)=>
 {
    if(req.body.uname=="dina" && req.body.psw=="12345")
    {
        res.redirect('user/userhome')     
    }
})


module.exports=userRouter
