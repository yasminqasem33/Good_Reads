const mongoose = require('mongoose')
var crypto = require('crypto');


const userSchema =  new mongoose.Schema(
    {
        firstName:{type:String},
        lastName:{type:String},
        email:{type:String},
        userpassword:{type:String},
        userImage:{type: String},
        state:{type: String},
        book:[{status:String, rate:String}],
        

    }
)




const userModel = mongoose.model('userSchema',userSchema)




 module.exports= userModel



// const user1=new userModel({
//     firstName:'so',
//     lastName:'so',
//     email:'so@com',
//     userpassword:'12345',
//     userImage:'23yio',
//     state:'offline'
// });
//  user1.save((err)=>{
//      if(!err){
//          console.log("saved");
//      }
//  }); 

