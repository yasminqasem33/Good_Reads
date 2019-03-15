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
<<<<<<< HEAD
        book:[{bookId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"bookModel"
        }, status:String, rate:String}]
=======
        book:[{name: String, status:String, rate:String}]
>>>>>>> 4058a7b3c8ca7d2e469894332bb7639fa1a0cd77
    }
)



<<<<<<< HEAD





//userSchema.plugin(passportlocalmongoose)
const userModel = mongoose.model('userSchema',userSchema)
=======
//userSchema.plugin(passportlocalmongoose)
const userModel = mongoose.model('userSchema',userSchema)




 module.exports= userModel
>>>>>>> 4058a7b3c8ca7d2e469894332bb7639fa1a0cd77

// userModel.remove({}, function (err) {
//     if (err) return handleError(err);

//     console.log("users deleted")
//          })

// userModel.create({
//     firstName:'so',
//     lastName:'so',
//     email:'so@gmail.com',
//     password:'12345',
//     userImage:'23yio',
//     book:[{bookId:"5c8745f4fc25d33b21592024", status:"read", rate:"3"}]
// });
 

 userModel.find().then((data)=>{
    console.log(data[0].book[0].rate)
    console.log(data.length)
})

 module.exports= userModel



