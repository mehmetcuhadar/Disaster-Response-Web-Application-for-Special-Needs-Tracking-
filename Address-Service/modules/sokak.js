const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sokakSchema = new Schema({
    sokak_cadde_id :{
        type : String,
        require : true
    },
    sokak_cadde_title: {
        type : String,
        require : true
    },
    sokak_cadde_mahallekey: {
        type : String,
        require : true
    }

})

const Sokak = mongoose.model('Sokak', sokakSchema)
module.exports = Sokak