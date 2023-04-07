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
          console.log(response.data);
          if(response.data){
            console.log("Redirecting to dashboard...");
            var warningMessage = document.getElementById("warning-message");
            warningMessage.style.display = "none";
            window.location = './index.html';
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