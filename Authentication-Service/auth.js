const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express()
const User = require("./user.js")
const dbURL = 'mongodb+srv://mcuhadar18:ee8iLI9KF5HpYpoM@adress.qai6yhk.mongodb.net/auth-log?retryWrites=true&w=majority'

mongoose.connect(dbURL, {useNewUrlParser : true, useUnifiedTopology: true})
.then((result) => app.listen(3002))
.catch((err) => console.log(err))

app.use(cors());

app.get('/addUser', (req, res) => {
  const input = new User({
    name: req.query.name || "", // Use the value of il_title query parameter 
    surname: req.query.surname || "", // Use the value of ilce_title query parameter 
    phone: req.query.phone || "", // Use the value of mahalle_title query parameter 
    username: req.query.username || "",  // Use the value of sokak_cadde_title query parameter 
    password: req.query.password || "",
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



app.get('/getPassword', (req, res) => {
  const username = req.query.username;

  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        res.status(404).send('User not found');
        return;
      }
      // Encrypt the password using bcryptjs library
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) {
            console.log(err);
            res.status(500).send('An error occurred while encrypting the password.');
          } else {
            res.send(hash);
          }
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('An error occurred while retrieving the password.');
    });
});



function login() {
    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    // check if username and password match admin credentials
    if (username === "" || password === "") {
        var warningMessage = document.getElementById("warning-message");
        warningMessage.style.display = "block";
        warningMessage.innerHTML = "Please enter your username and password.";
        return; 
    }

    if (username === "a" && password === "a") {
        console.log("Redirecting to dashboard...");
        window.location.href = "loading.html";

        setTimeout(function() {
			console.log("Redirecting to admin dashboard...");
			// Redirect to the admin dashboard after the delay
			window.location.href = "index.html";
		}, 5); 

    } else {
      console.log("Redirecting to dashboard...");
      var warningMessage = document.getElementById("warning-message");
      warningMessage.style.display = "block";
      warningMessage.innerHTML = "Invalid username or password";
    }
  }