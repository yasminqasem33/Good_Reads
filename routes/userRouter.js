const express = require('express')
const userModel = require('../models/userModel')
const userRouter = express.Router()

userRouter.get('/',(req,res)=>{
    res.render('pages/homepage.ejs')
})

userRouter.get('/userhome',(req,res)=>{
    res.render('pages/userHome.ejs')
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
            res.redirect('/user/userhome')
            console.log(usr)
    
        })
    }
    else
    {
        console.log("fslse password")
    }

    
})
var getSHA1ofJSON = function(input){
    return crypto.createHash('sha1').update(JSON.stringify(input)).digest('hex')
}

module.exports=userRouter
