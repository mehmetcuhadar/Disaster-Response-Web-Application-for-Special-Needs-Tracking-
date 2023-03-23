const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ilceSchema = new Schema({
    ilce_id :{
        type : String,
        require : true
    },
    ilce_title: {
        type : String,
        require : true
    },
    ilce_key: {
        type : String,
        require : true
    },
    ilce_sehirkey: {
        type : String,
        require : true
    }

})

const Ilce = mongoose.model('Ilce',ilceSchema)
module.exports = Ilce