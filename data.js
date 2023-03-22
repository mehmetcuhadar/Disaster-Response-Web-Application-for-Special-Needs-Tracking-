const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressSchema = new Schema({
    city :{

        type : String,
        require : true
    }

})

const Address = mongoose.model('Address',addressSchema)
module.exports = Address