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

const user1=new userSchema({
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
