const mongoose = require('mongoose')


const authorSchema =  new mongoose.Schema(
    {
        first_name:{type:String},
        last_name:{type:String},
        photo:{type:String},
        date_birth:{type:String}
    })
const authorModel = mongoose.model('authorSchema',authorSchema)
// const auther1=new authorModel({
//     first_name:'yasmin',
//     last_name:'qasem',
//     photo:'dina@com',
//     date_birth:'12345',
    
// });
//  auther1.save((err)=>{
//      if(!err){
//          console.log(auther1);
//      }
//  }); 


// authorModel.remove({}, function (err) {
//          if (err) return handleError(err);
    
//          console.log("auther deleted")
//               })

authorModel.find().then((data)=>{
    console.log(data)
})
module.exports=authorModel