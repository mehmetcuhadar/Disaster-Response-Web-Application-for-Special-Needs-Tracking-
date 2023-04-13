if (sessionStorage.getItem('username')) {
  window.location.href = 'tables.html';
}

function addUser() {
  axios.post('https://localhost:3002/addUser', "")
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
}

function login() {
    
    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    
    const data = {
        username: username,
        password: password
      };

    // check if username and password match admin credentials
    if (username === "" || password === "") {
        var warningMessage = document.getElementById("warning-message");
        warningMessage.style.display = "block";
        warningMessage.innerHTML = "Please enter your username and password.";
        return; 
    } else {
        axios.post('https://localhost:3002/login', data)
        .then((response) => {
          if(response.data[0]){

            var warningMessage = document.getElementById("warning-message");
            warningMessage.style.display = "none";
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("name", response.data[1]);
            sessionStorage.setItem("surname", response.data[2]);
            sessionStorage.setItem("phone", response.data[3]);
            sessionStorage.setItem("loggedIn", true);

            window.location = 'tables.html';
            
          }else{
            var warningMessage = document.getElementById("warning-message");
            warningMessage.style.display = "block";
            warningMessage.innerHTML = "Invalid username or password";
          }
        })
        .catch((error) => {
          console.log(error);
        });

    }

  }