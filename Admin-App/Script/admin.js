// dashboard.js
// Retrieve user information from sessionStorage
const username = sessionStorage.getItem("username");
const name_ = sessionStorage.getItem("name");
const surname = sessionStorage.getItem("surname");
const phone = sessionStorage.getItem("phone");

// Display user information on the dashboard page

if (!sessionStorage.getItem('username')) {
    window.location.href = 'login.html';
  }

/*
document.addEventListener("DOMContentLoaded", function() {
    var userInfo = document.getElementById("user-info");
    if (userInfo) {
      userInfo.innerText = `${name_} ${surname}`;
    }
});*/

function logout(){
    sessionStorage.clear();
    window.location.href = 'login.html';
}


function togglePasswordVisibility() {
  var passwordInput = document.getElementById('password');
  var passwordToggleIcon = document.getElementById('password-toggle-icon');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    passwordToggleIcon.className = 'fas fa-eye-slash';
  } else {
    passwordInput.type = 'password';
    passwordToggleIcon.className = 'fas fa-eye';
  }
}

function addUser() {
  // Get the form values
  event.preventDefault();
  var name = document.getElementById('name').value;
  var surname = document.getElementById('surname').value;
  var phone = document.getElementById('phone').value;
  var email = document.getElementById('email').value;
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Create an object with the user data
  var userData = {
    name: name,
    surname: surname,
    phone: phone,
    email: email,
    username: username,
    password: password
  };

  // Send the user data to the backend
  axios.post('https://localhost:3002/addUser', userData)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

    document.getElementById('admin-form').reset();
}
