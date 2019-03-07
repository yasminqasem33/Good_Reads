const mongoose = require('mongoose')
var crypto = require('crypto');


const userSchema =  new mongoose.Schema(
    {
        firstName:{type:String},
        lastName:{type:String},
        email:{type:String},
        userpassword:{type:String},
        userImage:{type: String}
    }
)
const userModel = mongoose.model('users',userSchema);
const user1=new userModel({
    firstName:'dina',
    lastName:'gamal',
    email:'dina@com',
    password:'12345',
    userImage:'23uyioo'
});
 user1.save((err)=>{
     if(!err){
         console.log("saved");
     }
 }); 



const userModel = mongoose.model('userSchema',userSchema)
module.exports= userModel
