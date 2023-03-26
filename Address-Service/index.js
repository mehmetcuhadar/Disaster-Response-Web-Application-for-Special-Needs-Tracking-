const mongoose = require('mongoose')
const express = require('express')
const app = express()
const Sehir = require('./sehir.js')
const Ilce = require('./ilce.js')
const Mahalle = require('./mahalle.js')
const Sokak = require('./sokak.js')

const dbURL = 'mongodb+srv://mcuhadar18:ee8iLI9KF5HpYpoM@adress.qai6yhk.mongodb.net/adress-log?retryWrites=true&w=majority'
mongoose.connect(dbURL, {useNewUrlParser : true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err))

/*
app.get('/add',(req,res) => {

    const adress = new Address({
        city : 'Ankara'
    })

    adress.save()
        .then((result) => { 
            res.send(result)
            console.log("I am here")
        })
        .catch((err)=>{
            console.log(err)
        })
})
*/
app.get('/getSehir', (req, res) => {

    Sehir.find({})
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error retrieving data');
      });
  });

app.get('/getIlce',(req,res) => {
    const il_key = req.query.il_key; // get the search parameter from the query string
    const filter = il_key ? { ilce_sehirkey: il_key} : {};
    Ilce.find(filter)
    .then((result) => {
        res.send(result)
    })
    .catch((err)=> {
        console.log(err)
    })
})

app.get('/getMahalle',(req,res) => {
    const ilce_key = req.query.ilce_key; // get the search parameter from the query string
    const filter = ilce_key ? { mahalle_ilcekey: ilce_key} : {};
    Mahalle.find(filter)
    .then((result) => {
        res.send(result)
    })
    .catch((err)=> {
        console.log(err)
    })
})


app.get('/getSokak', (req, res) => {
    const mahalle_key = req.query.mahalle_key; // get the search parameter from the query string
    const filter = mahalle_key ? { sokak_cadde_mahallekey: mahalle_key } : {}; // create a filter object based on the search parameter
    Sokak.find(filter)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error retrieving data');
      });
  });

/*
app.get('/retrieve',(req,res) => {
    Address.find()
        .then((result)=> {
            res.render('index',{addresses:result})
        })
        .catch((err)=>{
            console.log(err)
        })
})

*/