//installed modules by  => npm i name_modules --save 
const express = require('express')
const mongoose = require('mongoose')
const adminModel = require('./models/adminModel')
const ROUTER = process.env.ROUTER || 5000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/goodReadDb';


//required from other files
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')


mongoose.connect(MONGO_URL , (err) =>
{
    if(!err)console.log("Mongo Connected! ");
})


const app = express()
app.set('view engine','ejs')
app.set('views','views')
app.use(express.static('public'))
app.use(express.urlencoded())
app.use(express.json())



app.use('/admin',adminRouter);
app.use('/user',userRouter);
app.use(express.static(__dirname + '/public'));
app.listen(ROUTER,()=>
{
    console.log("Server Started!")

})
