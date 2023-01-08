const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const logoutButton = document.getElementById('signout');

form.addEventListener('submit', e => {
    e.preventDefault();

    checkInputs();
});

// logoutButton.addEventListener('click', e => {
//     e.preventDefault();
//     logoutUser();
// });


function checkInputs() {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    let isNull = true;

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

    loginUser(isNull);
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

// RESTFUL API


function loginUser(isNull) {
    const emailValue = email.value;
    const passwordValue = password.value;
    const id = 0;

    if (isNull) {
        fetch('http://localhost:5133/api/User/login', {
                method: "POST",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-type": "application/json"
                },
                mode: "cors",
                body: JSON.stringify({
                    Email: emailValue,
                    Password: passwordValue
                }),

            }).then(res => {
                return res.json();
            }).then((data) => {
                console.log(data)
                    //direct to homepage if it's true
                if (!data.error) {
                    alert("Login Successful!");
                    localStorage.setItem("UserID", data.userID);
                    localStorage.setItem("Email", emailValue);
                    window.location.href = "homepage.html";
                }

            })
            .catch(error => {
                console.log(error);
                //if email or password incorrect
                if (error) {
                    alert("Incorrect email or password.\nTry Again");
                }
            });
    } else {
        console.log("NO INPUT");
    }
}

// function getUserData() {
//     fetch('http://localhost:5133/api/User/login', {
//             method: "GET",
//             headers: {
//                 Accept: "application/json, text/plain, */*",
//                 "Content-type": "application/json"
//             },
//             mode: "cors",
//             body: JSON.stringify({
//                 UserID: id,
//                 Email: emailValue,
//                 Password: passwordValue
//             }),

//         }).then(res => {
//             return res.json();
//         }).then((data) => {
//             console.log(data)
//                 //direct to homepage if it's true
//             if (!data.error) {
//                 alert("Login Successful!");
//                 sessionStorage.setItem("Email", emailValue);
//                 window.location.href = "homepage.html";
//             }

//         })
//         .catch(error => {
//             console.log(error);
//             //if email or password incorrect
//             if (error) {
//                 alert("Incorrect email or password.\nTry Again");
//             }
//         });
// }