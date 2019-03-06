const mongoose = require('mongoose')


const categorySchema =  new mongoose.Schema(
    {
        name:{type:String},
        
        
    }
)
const categoryModel = mongoose.model('categorySchema',categorySchema)
module.exports=categoryModel