const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors');
const app = express()
const Input = require("./input.js")
const dbURL = 'mongodb+srv://mcuhadar18:ee8iLI9KF5HpYpoM@adress.qai6yhk.mongodb.net/input-log?retryWrites=true&w=majority'
mongoose.connect(dbURL, {useNewUrlParser : true, useUnifiedTopology: true})
.then((result) => app.listen(3001))
.catch((err) => console.log(err))


app.use(cors());

app.get('/addInput', (req, res) => {
    const input = new Input({
      il_title: req.query.il_title || "", // Use the value of il_title query parameter 
      ilce_title: req.query.ilce_title || "", // Use the value of ilce_title query parameter 
      mahalle_title: req.query.mahalle_title || "", // Use the value of mahalle_title query parameter 
      sokak_cadde_title: req.query.sokak_cadde_title || "",  // Use the value of sokak_cadde_title query parameter 
      need_title: req.query.need_title || "",
      add_info: req.query.add_info || "",
    });
    
    input.save()
      .then((result) => { 
        res.send(true + result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('An error occurred while saving the input.');
      });
  });
  