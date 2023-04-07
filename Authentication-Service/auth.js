const mongoose = require('mongoose')
const express = require('express')
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express()
const User = require("./user.js")
const dbURL = 'mongodb+srv://mcuhadar18:ee8iLI9KF5HpYpoM@adress.qai6yhk.mongodb.net/auth-log?retryWrites=true&w=majority'
const config = require("./config.js");
const pepper = config.pepper;

mongoose.connect(dbURL, {useNewUrlParser : true, useUnifiedTopology: true})
.then((result) => {
  https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
  }, app).listen(3002, function () {
    console.log('Server listening on https://localhost:3002');
  });
})
.catch((err) => console.log(err))

app.use(express.json());
app.use(cors());

app.post('/addUser', async (req, res) => {
  //const { name, surname, phone, username, password } = req.body;
  const [name, surname, phone, username, password] = ["Doğukan", "Soyuyüce", "123132", "dsoyuyuce", "111111"];
  const user = await User.findOne({ username });
  if (!user) {
    // Handle user not found error
    bcrypt.hash(password + pepper, 10, (err, hash) => {
      if (err) {
        console.log(err);
        res.status(500).send('An error occurred while hashing the password.');
      } else {
        const input = new User({
          name,
          surname,
          phone,
          username,
          password: hash,
        });
        input.save()
          .then((result) => {
            res.send(result);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send('An error occurred while saving the input.');
          });
      }
    });
    
  }else{
    console.log('User is defined');
  }
  
});


app.post('/login', async (req, res) => {
  
  const { username, password } = req.body;


  // Find the user in MongoDB by username
  const user = await User.findOne({ username });
  if (!user) {
    // Handle user not found error
    console.log("User not found")
    return res.send([false]);
  }
  // Compare the user's input password to the hashed password stored in MongoDB
  const isPasswordValid = await bcrypt.compare(password + pepper, user.password);
  if (isPasswordValid) {
    // Handle successful login
    res.send([true, user.name, user.surname, user.phone]);
  } else {
    res.send([false]);
  }
});