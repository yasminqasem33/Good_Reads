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
<<<<<<< HEAD


=======
>>>>>>> 4058a7b3c8ca7d2e469894332bb7639fa1a0cd77
const bookModel = mongoose.model('bookSchema',bookSchema)

// const book1=new bookModel({
//     name:"fbook",
//     image:"saa",
//     categoryId:"5c86cf8a1d0f19499b26af75",
//     authorId:"5c86d16e9c90e159843a1e69",
//    avgrate: "3"
//     });
//      book1.save((err)=>{
//          if(!err){
//              console.log(book1);
//          }else{
//              console.log("err book 1")
//          }
//      }); 
    

// bookModel.create({
//     name:"nada",
//         image:"mohamed",
//         categoryId:"5c815540480b7716c92485a6",
//         authorId:" 5c86cea2bafaeb41dd16c2b6"},
//          function (err, userData) {
//     if (err) return handleError(err);

//     console.log(userData)
//          })

// bookModel.remove({}, function (err) {
//     if (err) return handleError(err);

//     console.log()
//          })

// bookModel.find().then((data)=>{
//     console.log(data)
// })

// bookModel.remove({}, function (err) {
//          if (err) return handleError(err);
    
//          console.log("books deleted")
//               })


module.exports=bookModel