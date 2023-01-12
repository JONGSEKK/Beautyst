const form = document.getElementById('form');
const nama = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const comment = document.getElementById('comment');

form.addEventListener('submit', e => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    const emailValue = email.value.trim();
    const nameValue = nama.value.trim();
    const subjectValue = subject.value.trim();
    const commentValue = comment.value.trim();

    let isNull = true;

    if (nameValue === '') {
        setErrorFor(nama, 'Name cannot be blank');
        isNull = false;
    } else {
        setSuccessFor(nama);
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

    if (subjectValue === '') {
        setErrorFor(subject, 'Subject cannot be blank');
        isNull = false;
    } else {
        setSuccessFor(subject);
        isNull = true;
    }

    if (commentValue === '') {
        setErrorFor(comment, 'Comment cannot be blank');
        isNull = false;
    } else {
        setSuccessFor(comment);
        isNull = true;
    }

    insertContact(isNull);
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

function insertContact(isNull) {

    const nameValue = nama.value;
    const emailValue = email.value;
    const subjectValue = subject.value;
    const commentValue = comment.value;

    if (isNull) {
        fetch('http://localhost:5133/api/ContactUs/AddContactUs', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({
                    Name: nameValue,
                    Email: emailValue,
                    Subject: subjectValue,
                    Comment: commentValue
                }),

            }).then(res => {
                return res.json();
            })
            .then(data => console.log(data))
            .then(() => {
                location.reload();
            })
            .catch(error => console.log(error));
        alert("Report Submitted!");
    } else {
        console.log("NO INPUT");
    }
}