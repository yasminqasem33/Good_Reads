const mongoose = require('mongoose')


const bookSchema =  new mongoose.Schema(
    {
        bookName:{type:String},
        bookImage:{type: String},
        authorId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"authorModel"
        },
        categoryId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"categoryModel"
        }
        
    }
)
const bookModel = mongoose.model('bookSchema',bookSchema)
module.exports=bookModel