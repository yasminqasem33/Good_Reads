const mongoose = require('mongoose')
//var passportlocalmongoose= require('passport-local-mongoose')

const userBookSchema =  new mongoose.Schema(
    {
       
       bookId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"bookModel"
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"userModel"

        },
        stauts:{type:String},
        rate:{type:String},
        review:{type:String}

    }   
)



const userbookModel = mongoose.model('userBookSchema',userBookSchema)
// userbookModel.findOne({$and:[{stauts:"read"},{userId: "id5c8b833e5ed9a827fd19c18f"}]}).then((books)=>
// {
//     console.log( "matche" +books)

// })

// const author =userbookModel.
// findOne({ stauts: 'wanttoread' }).select('stauts').populate('bookId').select('name photo').populate('bookId.authorId').select('first_name last_name')
// .populate( 'bookModel').select('bookId')
// console.log(author.bookId);

// userbookModel.find().then((all)=>
// {
//     console.log("boouser"+all)
// })
module.exports= userbookModel
