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




const userModel = mongoose.model('userSchema',userSchema)
module.exports= userModel