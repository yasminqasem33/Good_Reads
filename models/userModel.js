const mongoose = require('mongoose')
//var passportlocalmongoose= require('passport-local-mongoose')

const userSchema =  new mongoose.Schema(
    {
        firstName: { type: String, required: "First Name is required" },
        lastName: { type: String, required: "Last Name is required" },
        email: {
            type: String, trim: true, lowercase: true, unique: true,
            required: 'Email address is required',
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password:{type: String},
        userImage:{type: String},
        book:{name: String, status:String, rate:String}
    }
)



//userSchema.plugin(passportlocalmongoose)
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

