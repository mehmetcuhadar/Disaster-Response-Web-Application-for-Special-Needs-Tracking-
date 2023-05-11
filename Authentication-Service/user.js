const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name :{
        type : String,
        require : true
    },
    surname: {
        type : String,
        require : true
    },
    phone :{
        type : String,
        require : true
    },
    mail :{
        type : String,
        require : true
    },
    username :{
        type : String,
        require : true
    },
    password :{
        type : String,
        require : true
    }} )

const User = mongoose.model('User',userSchema)
module.exports = User