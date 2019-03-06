const mongoose = require('mongoose')


const authorSchema =  new mongoose.Schema(
    {
        first_name:{type:String},
        last_name:{type:String},
        photo:{type:String},
        date_birth:{type:String},

        
        
    }
)

const authorModel = mongoose.model('authorSchema',authorSchema)
// authorModel.create({
//     first_name:"author11",
//     last_name:"ssss",
//     photo:"dss",
//     date_birth:"assa"
// }, function (err, authorData) {
//     if (err) return handleError(err);

//     console.log(authorData)


// })
module.exports=authorModel