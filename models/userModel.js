const mongoose = require('mongoose')
var crypto = require('crypto');


const userSchema =  new mongoose.Schema(
    {
        firstName:{type:String},
        lastName:{type:String},
        email:{type:String},
        userpassword:{type:String},
        userImage:{type: String},
<<<<<<< HEAD
        book:[{status:String, rate:String}]
=======
        state:{type: String}

>>>>>>> e028a807d8c7ac978d886cb2555c43b7e7016469
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

