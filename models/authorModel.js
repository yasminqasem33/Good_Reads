const mongoose = require('mongoose')


const authorSchema =  new mongoose.Schema(
    {
        name:{type:String},
        
        
        
    }
)
const authorModel = mongoose.model('authorSchema',authorSchema)
module.exports=authorModel