const mongoose = require('mongoose')


const categorySchema =  new mongoose.Schema(
    {
        name:{type:String},
        
        
    }
)
const categoryModel = mongoose.model('categorySchema',categorySchema)
// const cat1=new categoryModel({
//  name:"economy"
// })
// cat1.save ((err)=>{

<<<<<<< HEAD
// })
// const cat2=new categoryModel({
//  name:"art"
// })
// cat2.save ((err)=>{
//     console.log("saved")
// })


// const cat3=new categoryModel({
//     name:"sports"
//    })
//    cat3.save ((err)=>{
//        if(!err){
//            console.log("saved")
//        }
//    })
// categoryModel.create({
//     name:"sports"
// })
// .then((data)=>
// {
//     console.log(data)
// })
module.exports=categoryModel
=======

 module.exports=categoryModel
>>>>>>> 7bcdb8b5fcb94024b17715f6da6bf701dee6d03a
