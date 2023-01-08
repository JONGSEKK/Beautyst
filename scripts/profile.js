const userInfo = document.getElementById("user_info");

function displayProfile() {
    let userID = localStorage.getItem("UserID");
    fetch('http://localhost:5133/api/User/getUserId?id=' + userID, )
        .then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
            let user = "";
            data.map((values) => {
                user += `
                <h1>Hi! &nbsp</h1>
                <h1 class="fullName">${values.firstName} &nbsp ${values.lastName}</h1>
                <p>First Name</p>
                <input type="text" id="fn" class="fname" value="${values.firstName}">
                <p>Last Name</p>
                <input type="text" id="ln"class="lname" value="${values.lastName}">
                <p>Username</p>
                <input type="text" id="uname" class="username" value="${values.username}">
                <p>Email</p>
                <input type="text" id="email" class="email" value="${values.email}">
                <br />
                <p class="submit"  onclick="editUser(${values.userID})">
                    <a href="" id="submit"> Submit</a>
                </p>
                `;
            });
            userInfo.innerHTML = user;
        }).catch(error => console.log(error));

}

function editUser(userID) {
    const firstname = document.getElementById("fn").value;
    const lastname = document.getElementById("ln").value;
    const username = document.getElementById("uname").value;
    const email = document.getElementById("email").value;
    // const firstName = firstname.value;
    // const lastName = lastname.value;
    // const userName = username.value;
    // const email = Email.value;

    fetch('http://localhost:5133/api/User/' + userID, {
            method: "PATCH",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FirstName: firstname,
                LastName: lastname,
                Username: username,
                Email: email,
            })
        }).then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            localStorage.setItem("UserID", data.userID);
        })
        .catch(error => console.log(error));
    alert("Updated Successfull!");
    window.location.href = "profile.html";
}

displayProfile();