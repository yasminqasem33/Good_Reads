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

