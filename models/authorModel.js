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




module.exports=authorModel