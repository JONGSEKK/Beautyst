var attempt = 3; 

function validate(){
var email = document.getElementById("email").value;
var password = document.getElementById("password").value;
if ( email == "Formget@gmail.com" && password == "formget#123"){
alert ("Login successfully");
window.location = "#";
return false;
}
else{
attempt --;
alert("Invalid Email And Password \nYou have left "+attempt+" attempt");

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