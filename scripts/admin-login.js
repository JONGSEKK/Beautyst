const form = document.getElementById('form');
const password = document.getElementById('password');

form.addEventListener('submit', e => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    const passwordValue = password.value.trim();

    let isNull = true;

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
        isNull = false;
    } else {
        setSuccessFor(password);
        isNull = true;
    }
    adminLogin(isNull);
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

function viewPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

// RESTFUL API

function adminLogin(isNull) {
    const passwordValue = password.value;

    if (isNull) {
        fetch('http://localhost:5133/api/Admin/login', {
                method: "POST",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-type": "application/json"
                },
                mode: "cors",
                body: JSON.stringify({
                    Password: passwordValue
                }),
            }).then(res => {
                return res.json();
            }).then((data) => {
                console.log(data)
                    //direct to homepage if it's true
                if (!data.error) {
                    alert("Login Successful!");
                    window.location.href = "admin-dashboard.html";
                }

            })
            .catch(error => {
                console.log(error);
                //if email or password incorrect
                if (error) {
                    alert("Incorrect password.\nTry Again");
                }
            });
    } else {
        console.log('NO INPUT');
    }
}