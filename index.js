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
    const searchParam = req.query.searchParam; // get the search parameter from the query string
    const filter = searchParam ? { sehir_title: { $regex: searchParam, $options: 'i' } } : {}; // create a filter object based on the search parameter
    Sehir.find(filter)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error retrieving data');
      });
  });

app.get('/getIlce',(req,res) => {
    Ilce.find({})
    .then((result) => {
        res.send(result)
    })
    .catch((err)=> {
        console.log(err)
    })
})

app.get('/getMahalle',(req,res) => {
    Mahalle.find()
    .then((result) => {
        res.send(result)
    })
    .catch((err)=> {
        console.log(err)
    })
})


app.get('/getSokak', (req, res) => {
    const searchParam = req.query.searchParam; // get the search parameter from the query string
    const filter = searchParam ? { sokak_cadde_id: searchParam } : {}; // create a filter object based on the search parameter
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