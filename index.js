const mongoose = require('mongoose')
const express = require('express')
const app = express()
const Address = require('./data.js')

const dbURL = 'mongodb+srv://mcuhadar18:ee8iLI9KF5HpYpoM@adress.qai6yhk.mongodb.net/adress-log?retryWrites=true&w=majority'
mongoose.connect(dbURL, {useNewUrlParser : true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err))


app.get('/add',(req,res) => {

    const adress = new Address({
        city : 'Ankara'
    })

    adress.save()
        .then((result) => { 
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
})
/*
app.get('/all',(req,res) => {
    Address.find()
    .then((result) => {
        res.send(result)
    })
    .catch((err)=> {
        console.log(err)
    })
})

*/
app.get('/',(req,res) => {
    Address.find()
        .then((result)=> {
            res.render('index',{addresses:result})
        })
        .catch((err)=>{
            console.log(err)
        })
})

