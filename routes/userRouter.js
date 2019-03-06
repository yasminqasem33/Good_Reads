const express = require('express')


const userRouter = express.Router()

userRouter.get('/', (req, res) => {
    res.render('pages/userhome.ejs')
 });
module.exports=userRouter
