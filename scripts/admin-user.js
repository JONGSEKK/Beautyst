// Get the modal
let modal = document.getElementById('id01');
const tableBody = document.querySelector("#body");
const tableHeader = document.querySelector("#header");


let isOpen = true;

document.querySelector(".list-icon").addEventListener("click", () => {
    if (isOpen) {
        document.getElementById("myNavbar").style.display = "none";
        isOpen = false;
    } else {
        document.getElementById("myNavbar").style.display = "block";
        isOpen = true;
    }
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function displayUser() {

    fetch('http://localhost:5133/api/User')
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);

            if (data.length !== 0 && tableBody !== "") {
                let listUser = "";

                data.map((values) => {
                    listUser += `
                    <div class="table-row" >
                    <div class="table-row-cell">
                        ${values.firstName}
                    </div>
                    <div class="table-row-cell">
                        ${values.lastName}
                    </div>
                    <div class="table-row-cell">
                        ${values.username}
                    </div>
                    <div class="table-row-cell">
                        ${values.email}
                    </div>
                    <div class="table-row-cell">
                        <button class="button-trash" onclick="document.getElementById('id${values.userID}').style.display='block'">
                            <i class="bi bi-trash-fill icon-trash"></i>
                        </button>
                    </div>
                </div>

            <div id="id${values.userID}" class="modal">
                <div class="modal-content">
                    <div class="container">
                        <h1>Delete Account</h1>
                        <p class="p-delete">Are you sure you want to delete user account?</p>
        
                        <div class="clearfix">
                            <button type="button" onclick="document.getElementById('id${values.userID}').style.display='none'" class="cancelbtn">Cancel</button>
                            <button type="button" onclick="deleteButton(${values.userID})" class="deletebtn">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
                    `;
                });

                tableBody.innerHTML = listUser;
            } else {
                tableHeader.innerHTML = ` 
                <p class="no-user">User are not available!<p>
                `;
            }

        })
        .catch(error => console.log(error));
}

function deleteButton(userID) {

    fetch('http://localhost:5133/api/User/' + userID, {

            method: "DELETE",
            mode: "cors",
            headers: {
                'Content-type': 'application/json;'
            },
        }).then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);

        })
        .then(() => {
            location.reload();
        })
        .catch(error => console.log(error));
}

function logoutAdmin() {
    localStorage.removeItem("Password");
    window.location.href = "admin-login.html";
}

displayUser();