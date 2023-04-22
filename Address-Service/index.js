const mongoose = require('mongoose')
const express = require('express')
const https = require('https');
const fs = require('fs');
const app = express()
const Sehir = require('./modules/sehir.js')
const Ilce = require('./modules/ilce.js')
const Mahalle = require('./modules/mahalle.js')
const Sokak = require('./modules/sokak.js')
const Ihtiyac = require('./modules/ihtiyac.js');

const dbURL = 'mongodb+srv://mcuhadar18:ee8iLI9KF5HpYpoM@adress.qai6yhk.mongodb.net/adress-log?retryWrites=true&w=majority'
mongoose.connect(dbURL, {useNewUrlParser : true, useUnifiedTopology: true})
.then((result) => {
  https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
  }, app).listen(3000, function () {
    console.log('Server listening on https://localhost:3000');
  });
})
.catch((err) => console.log(err))


const cors = require('cors');
app.use(cors())


app.get('/getSehir', (req, res) => {

    Sehir.find({})
    .collation({ locale: 'tr', strength: 2 })
    .sort({sehir_title: 1})
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
    .collation({ locale: 'tr', strength: 2 })
    .sort({ilce_title: 1})
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
    .collation({ locale: 'tr', strength: 2 })
    .sort({mahalle_title: 1})
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
    .collation({ locale: 'tr', strength: 2 })
    .sort({sokak_cadde_title: 1})
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error retrieving data');
      });
  });


  app.get('/getIhtiyac', (req, res) => {

    Ihtiyac.find()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error retrieving data');
      });
  });


  app.get('/addIhtiyac', (req, res) => {

    const input = new Ihtiyac({
      ihtiyac_title: req.query.ihtiyac_title || ""
    });
    
    input.save()
      .then((result) => { 
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('An error occurred while saving the input.');
      });
  });
