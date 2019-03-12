const mongoose = require('mongoose')



const bookSchema =  new mongoose.Schema(
    {
        image:{type: String},
        name:{type:String},
        avgrate:{type:String},
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
//     name:"aya",
//         image:"saa",
//         categoryId:"5c815540480b7716c92485a6",
//         authorId:"5c84e6856577436aad638098"},
//          function (err, userData) {
//     if (err) return handleError(err);

//     console.log(userData)
//          })

// bookModel.remove({}, function (err) {
//     if (err) return handleError(err);

//     console.log()
//          })
module.exports=bookModel