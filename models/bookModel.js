const mongoose = require('mongoose')



const bookSchema =  new mongoose.Schema(
    {
        image:{type: String},
        name:{type:String},
        categoryId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"categoryModel"
        },
        authorId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"authorModel"
        }
        
        
    }
)
const bookModel = mongoose.model('bookSchema',bookSchema)



module.exports=bookModel