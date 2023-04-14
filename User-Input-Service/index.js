const mongoose = require('mongoose')
const express = require('express')
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const moment = require('moment-timezone');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const app = express()
const Input = require("./input.js");
const { query } = require('express');
const accountSid = "AC611662a21d1aaede003324c0f221730a";
const authToken = "5fed3102167a8df03149f610215bc3f6";
//const client = require("twilio")(accountSid, authToken);
const dbURL = 'mongodb+srv://mcuhadar18:ee8iLI9KF5HpYpoM@adress.qai6yhk.mongodb.net/input-log?retryWrites=true&w=majority'
mongoose.connect(dbURL, {useNewUrlParser : true, useUnifiedTopology: true})
.then((result) => {
  https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
  }, app).listen(3001, function () {
    console.log('Server listening on https://localhost:3001');
  });
})
.catch((err) => console.log(err))


app.use(cors());
app.use(bodyParser.json());

app.get('/addInput', async (req, res) => {
  let id = shortid.generate();
  let input = new Input({
    id,
    il_title: req.query.il_title || "", // Use the value of il_title query parameter 
    ilce_title: req.query.ilce_title || "", // Use the value of ilce_title query parameter 
    mahalle_title: req.query.mahalle_title || "", // Use the value of mahalle_title query parameter 
    sokak_cadde_title: req.query.sokak_cadde_title || "",  // Use the value of sokak_cadde_title query parameter 
    site_title: req.query.site_title || "",
    apartman_title: req.query.apartman_title || "",
    tel_number: "".concat("+90",req.query.tel_number) || "",
    ihtiyac_title: req.query.ihtiyac_title || "",
    add_info: req.query.add_info || "",
    created_at: moment.tz('Europe/Istanbul').toDate(),
    status: "0"
  });
  while (true) {
    try {
      await input.save();
      res.send({id: id});
      /*if (input.tel_number != ""){
        client.messages
        .create({ body: ("Talebiniz alınmıştır. Takip numaranız: ").concat(" ", id), from: "+15077107058", to: input.tel_number })
        .then(message => console.log(message.sid));
      }
      */
      break;
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        // 11000 is the code for duplicate key error
        id = shortid.generate();
        input.id = id;
      } else {
        console.error(error);
        res.status(500).send('An error occurred while saving the input.');
        break;
      }
    }
  }
});

  
  app.get('/getInputs', (req, res) => {
    const id = req.query.id || "";
    const il_title = req.query.il_title || "";
    const ilce_title = req.query.ilce_title || "";
    const mahalle_title = req.query.mahalle_title || "";
    const sokak_cadde_title = req.query.sokak_cadde_title || "";
    const site_title = req.query.site_title || "";
    const apartman_title = req.query.apartman_title || "";
    const tel_number = req.query.tel_number || "";
    const ihtiyac_title = req.query.ihtiyac_title || "";
    const add_info = req.query.add_info || "";
    const status = req.query.status || "";
    const created_at = req.query.created_at || "";
  
    var filter = {
      il_title: { $regex: `.*${il_title}.*`, $options: "i" },
      ilce_title: { $regex: `.*${ilce_title}.*`, $options: "i" },
      mahalle_title: { $regex: `.*${mahalle_title}.*`, $options: "i" },
      sokak_cadde_title: { $regex: `.*${sokak_cadde_title}.*`, $options: "i" },
      site_title: { $regex: `.*${site_title}.*`, $options: "i" },
      apartman_title: { $regex: `.*${apartman_title}.*`, $options: "i" },
      tel_number: { $regex: `.*${tel_number}.*`, $options: "i" },
      ihtiyac_title: { $regex: `.*${ihtiyac_title}.*`, $options: "i" },
      add_info: { $regex: `.*${add_info}.*`, $options: "i" },
      status: { $regex: `.*${status}.*`, $options: "i" },

    };
    
    if (id != ""){
      filter = id ? { id: id} : {};
    }
  
    Input.find(filter)
      .then((inputs) => {
        res.send(inputs);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("An error occurred while retrieving inputs.");
      });
  });
  
  app.get('/getIlCounts', (req, res) => {
    Input.aggregate([
      {
        $group: {
          _id: { il_title: "$il_title", ihtiyac_title: "$ihtiyac_title" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.il_title",
          ihtiyac_counts: {
            $push: { ihtiyac_title: "$_id.ihtiyac_title", count: "$count" },
          },
          total_count: { $sum: "$count" },
        },
      },
      { $project: { _id: 0, il_title: "$_id", ihtiyac_counts: 1, total_count: 1 } },
    ])
      .then((counts) => {
        res.send(counts);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("An error occurred while retrieving counts.");
      });
  });
  
  
  
  

  app.get('/getIlceCounts', (req, res) => {
    const il_title = req.query.il_title || "";
    Input.aggregate([
      { $match: { il_title: il_title } },
      {
        $group: {
          _id: { ilce_title: "$ilce_title", ihtiyac_title: "$ihtiyac_title" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.ilce_title",
          ihtiyac_counts: {
            $push: { ihtiyac_title: "$_id.ihtiyac_title", count: "$count" },
          },
          total_count: { $sum: "$count" },
        },
      },
      { $project: { _id: 0, ilce_title: "$_id", ihtiyac_counts: 1, total_count: 1 } },
    ])
      .then((counts) => {
        res.send(counts);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("An error occurred while retrieving counts.");
      });
  });
  
  app.get("/getIhtiyacCounts", (req, res) => {
    Input.aggregate([
      {
        $group: {
          _id: "$ihtiyac_title",
          count: { $sum: 1 },
          il_title: { $push: "$il_title" }
        }
      },
      {
        $unwind: "$il_title"
      },
      {
        $group: {
          _id: {
            ihtiyac_title: "$_id",
            il_title: "$il_title"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.ihtiyac_title",
          count: { $sum: "$count" },
          il_title: { $push: { il_title: "$_id.il_title", count: "$count" } }
        }
      },
      {
        $project: {
          _id: 0,
          ihtiyac_title: "$_id",
          count: 1,
          il_title: 1
        }
      }
    ])
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred while retrieving ihtiyac counts.");
    });
  });
  

  app.put('/changeStatus/:id', async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    
    try {
      const filter = { id: id };
      const update = { status: status };
      
      // Find the document by ID and update its status field
      const updatedInput = await Input.updateOne(filter, update);
  
      if (!updatedInput) {
        return res.status(404).send('Input not found');
      }
  
      res.send(updatedInput);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  