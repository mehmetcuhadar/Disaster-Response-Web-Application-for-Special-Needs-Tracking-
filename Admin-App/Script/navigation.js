const homeDiv = document.getElementById("home-button");
const searchDiv = document.getElementById("search-button");
const adminDiv = document.getElementById("admin-button");
const pendingDiv = document.getElementById("pending-button");

homeDiv.addEventListener("click",() => {changeDiv("home")});
searchDiv.addEventListener("click",() => {changeDiv("search-requests")});
adminDiv.addEventListener("click",() => {changeDiv("admin")});
pendingDiv.addEventListener("click",() => {changeDiv("pending-requests")});

function changeDiv(div_name) {
  var i;
  var x = document.getElementsByClassName("bar-items");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(div_name).style.display = "block";  
}
