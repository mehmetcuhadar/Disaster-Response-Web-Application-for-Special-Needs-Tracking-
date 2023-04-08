const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ihtiyacSchema = new Schema({
    ihtiyac_title :{
        type : String,
        require : true
    }
})

const Ihtiyac = mongoose.model('Ihtiyac',ihtiyacSchema)
module.exports = Ihtiyac