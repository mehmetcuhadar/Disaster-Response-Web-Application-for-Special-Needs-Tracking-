const mongoose = require('mongoose')
const express = require('express')
const app = express()
const Sehir = require('./modules/sehir.js')
const Ilce = require('./modules/ilce.js')
const Mahalle = require('./modules/mahalle.js')
const Sokak = require('./modules/sokak.js')

const dbURL = 'mongodb+srv://mcuhadar18:ee8iLI9KF5HpYpoM@adress.qai6yhk.mongodb.net/adress-log?retryWrites=true&w=majority'
mongoose.connect(dbURL, {useNewUrlParser : true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err))


const cors = require('cors');

app.use(cors());


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


