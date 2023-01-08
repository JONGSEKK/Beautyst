const form = document.getElementById('form');
const firstname = document.getElementById('fn');
const lastname = document.getElementById('ln');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    // trim to remove the whitespaces
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    let isNull = true;

    if (firstnameValue === '') {
        setErrorFor(firstname, 'First Name cannot be blank');
        isNull = false;
    } else {
        setSuccessFor(firstname);
        isNull = true;
    }

    if (lastnameValue === '') {
        setErrorFor(lastname, 'Last Name cannot be blank');
        isNull = false;
    } else {
        setSuccessFor(lastname);
        isNull = true;
    }

    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
        isNull = false;
    } else {
        setSuccessFor(username);
        isNull = true;
    }

    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
        isNull = false;
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
        isNull = false;
    } else {
        setSuccessFor(email);
        isNull = true;
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
        isNull = false;
    } else {
        setSuccessFor(password);
        isNull = true;
    }

    if (password2Value === '') {
        setErrorFor(password2, 'Password cannot be blank');
        isNull = false;
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, 'Passwords does not match');
        isNull = false;
    } else {
        setSuccessFor(password2);
        isNull = true;
    }
    insertUser(isNull);
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function viewPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function viewPassword2() {
    var x = document.getElementById("password2");
    if (x.type === "password2") {
        x.type = "text";
    } else {
        x.type = "password2";
    }
}

// RESTFUL API 
function insertUser(isNull) {

    const firstnameValue = firstname.value;
    const lastnameValue = lastname.value;
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const password2Value = password2.value;

    if (isNull) {
        fetch('http://localhost:5133/api/User/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({
                    FirstName: firstnameValue,
                    LastName: lastnameValue,
                    Email: emailValue,
                    Username: usernameValue,
                    Password: password2Value
                }),

            }).then(res => {
                return res.json();
            })
            .then(data => console.log(data))
            .then(() => {
                location.reload();
            })
            .catch(error => console.log(error));
        alert("Register Successful!");
    } else {
        console.log("NO INPUT");
    }

}