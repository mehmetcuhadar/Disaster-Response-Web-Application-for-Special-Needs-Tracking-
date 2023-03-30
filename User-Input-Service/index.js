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
      site_title: req.query.site_title || "",
      apartman_title: req.query.apartman_title || "",
      tel_number: req.query.tel_number || "",
      ihtiyac_title: req.query.ihtiyac_title || "",
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
  
  app.get('/getInputs', (req, res) => {
    const il_title = req.query.il_title || "";
    const ilce_title = req.query.ilce_title || "";
    const mahalle_title = req.query.mahalle_title || "";
    const sokak_cadde_title = req.query.sokak_cadde_title || "";
    const site_title = req.query.site_title || "";
    const apartman_title = req.query.apartman_title || "";
    const tel_number = req.query.tel_number || "";
    const ihtiyac_title = req.query.ihtiyac_title || "";
    const add_info = req.query.add_info || "";
  
    const filter = {
      il_title: { $regex: `.*${il_title}.*`, $options: "i" },
      ilce_title: { $regex: `.*${ilce_title}.*`, $options: "i" },
      mahalle_title: { $regex: `.*${mahalle_title}.*`, $options: "i" },
      sokak_cadde_title: { $regex: `.*${sokak_cadde_title}.*`, $options: "i" },
      site_title: { $regex: `.*${site_title}.*`, $options: "i" },
      apartman_title: { $regex: `.*${apartman_title}.*`, $options: "i" },
      tel_number: { $regex: `.*${tel_number}.*`, $options: "i" },
      ihtiyac_title: { $regex: `.*${ihtiyac_title}.*`, $options: "i" },
      add_info: { $regex: `.*${add_info}.*`, $options: "i" },
    };
  
    Input.find(filter)
      .then((inputs) => {
        res.send(inputs);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("An error occurred while retrieving inputs.");
      });
  });
  