const mongoose = require('mongoose')
var crypto = require('crypto');


const adminSchema =  new mongoose.Schema(
    {
        name:{type:String},
        password:{type:String}
        
    }
)


// var getSHA1ofJSON = function(input){
//     return crypto.createHash('sha1').update(JSON.stringify(input)).digest('hex')
// }


const adminModel = mongoose.model('adminSchema',adminSchema)

// adminModel.create(
//     {
//     name:"yasmin"
//     ,
//     password:"12345"}
// )
    
    // adminModel.find().then((data)=>{
    //     console.log(data)
    // })
   
    







module.exports=adminModel