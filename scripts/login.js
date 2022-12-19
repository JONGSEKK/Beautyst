var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(){
var email = document.getElementById("email").value;
var password = document.getElementById("password").value;
if ( email == "Formget@gmail.com" && password == "formget#123"){
alert ("Login successfully");
window.location = "#"; // Redirecting to other page.
return false;
}
else{
attempt --;// Decrementing by one.
alert("Invalid Email And Password \nYou have left "+attempt+" attempt");
// Disabling fields after 3 attempts.
if( attempt == 0){
document.getElementById("email").disabled = true;
document.getElementById("password").disabled = true;
document.getElementById("submit").disabled = true;
return false;
}
}
}

function viewPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }