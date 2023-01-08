const form = document.getElementById('form');
const nama = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const comment = document.getElementById('comment');

form.addEventListener('Submit', e => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs() {
	const emailValue = email.value.trim();
	const nameValue = nama.value.trim();
    const subjectValue = subject.value.trim();
    const commentValue = comment.value.trim();

    if(nameValue === '') {
		setErrorFor(nama, 'Name cannot be blank');
	} else {
		setSuccessFor(nama);
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}

	if(subjectValue === '') {
		setErrorFor(subject, 'Subject cannot be blank');
	} else {
		setSuccessFor(subject);
	}

    if(commentValue === '') {
		setErrorFor(comment, 'Comment cannot be blank');
	} else {
		setSuccessFor(comment);
	}
	
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