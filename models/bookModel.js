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


// bookModel.create({
//     name:"book1",
//         image:"saa",
//         categoryId:"5c815540480b7716c92485a6",
//         authorId:"5c7fe1c80d5bea34984f5fd3"},
//          function (err, userData) {
//     if (err) return handleError(err);

//     console.log(userData)


module.exports=bookModel