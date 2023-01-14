// Get the modal
let modal = document.getElementById('id01');
const tableBody = document.querySelector("#contact-body");
const tableHeader = document.querySelector("#contact-header");


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

function displayContactUs() {
    fetch('http://localhost:5133/api/ContactUs/GetContactUs')
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);

            if (data.length !== 0 && tableBody !== "") {
                let listContact = "";

                data.map((values) => {
                    listContact += `
                    <div class="table-row">
                    <div class="table-row-cell">
                        ${values.name}
                    </div>
                    <div class="table-row-cell">
                    ${values.email}
                    </div>
                    <div class="table-row-cell">
                    ${values.subject}
                    </div>
                    <div class="table-row-cell">
                    ${values.comment}
                    </div>
                    <div class="table-row-cell">
                    <button class="button-trash" onclick="document.getElementById('id${values.contactID}').style.display='block'">
                    <i class="bi bi-trash-fill icon-trash"></i>
                   </button>
                    </div>
                </div>
                <div id="id${values.contactID}" class="modal">
                <div class="modal-content">
                    <div class="container">
                        <h1>Delete Message</h1>
                        <p class="p-delete">Are you sure you want to delete message?</p>
        
                        <div class="clearfix">
                            <button type="button" onclick="document.getElementById('id${values.contactID}').style.display='none'" class="cancelbtn">Cancel</button>
                            <button type="button" onclick="deleteContactUs(${values.contactID})" class="deletebtn">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
                `;

                });

                tableBody.innerHTML = listContact;
            } else {
                tableHeader.innerHTML = ` 
            <p class="no-user" style="background-color:#EEEEEE">No Report<p>
            `;
            }

        })
        .catch(error => console.log(error));
}

function deleteContactUs(contactID) {
    fetch('http://localhost:5133/api/ContactUs/' + contactID, {
        method: "DELETE",
        mode: "cors",
        headers: {
            'Content-type': 'application/json;'
        },
    }).then(data => {
        console.log(data);
    }).then(() => {
        location.reload();
    }).catch(error => console.log(error));

}

function logoutAdmin() {
    localStorage.removeItem("Password");
    window.location.href = "admin-login.html";
}

displayContactUs();