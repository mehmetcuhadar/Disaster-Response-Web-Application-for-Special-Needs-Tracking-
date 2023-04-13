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