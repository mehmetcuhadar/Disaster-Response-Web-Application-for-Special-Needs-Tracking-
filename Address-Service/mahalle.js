const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mahalleSchema = new Schema({
    mahalle_id :{
        type : String,
        require : true
    },
    mahalle_title: {
        type : String,
        require : true
    },
    mahalle_key: {
        type : String,
        require : true
    },
    mahalle_ilcekey: {
        type : String,
        require : true
    }

})

const Mahalle = mongoose.model('Mahalle', mahalleSchema)
module.exports = Mahalle