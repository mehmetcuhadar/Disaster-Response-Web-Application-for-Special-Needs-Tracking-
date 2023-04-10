const mongoose = require('mongoose')
const Schema = mongoose.Schema

const inputSchema = new Schema({
    id: {
        type: String,
        unique: true,
        require : true
    },
    il_title :{
        type : String,
        require : true
    },
    ilce_title: {
        type : String,
        require : true
    },
    mahalle_title: {
        type : String,
        require : true
    },
    sokak_cadde_title: {
        type : String,
        require : true
    },
    site_title: {
        type : String,
        require : true
    },
    apartman_title: {
        type : String,
        require : true
    },
    tel_number: {
        type : String,
        require : true
    },
    ihtiyac_title: {
        type : String,
        require : true
    },
    add_info:{
        type: String,
        require: true
    },
    created_at:{
        type: Date,
        require: true
    },
    status:{
        type: String,
        require: true
    }

})

const Input = mongoose.model('Input',inputSchema)
module.exports = Input