const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sehirSchema = new Schema({
    sehir_id :{
        type : String,
        require : true
    },
    sehir_title: {
        type : String,
        require : true
    },
    sehir_key: {
        type : String,
        require : true
    }

})

const Sehir = mongoose.model('Sehir',sehirSchema)
module.exports = Sehir