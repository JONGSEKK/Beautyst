const tableBody = document.querySelector("#body");
const tableBodyArticle = document.querySelector("#body-article");
const tableHeader = document.querySelector("#header");
const tableHeaderArticle = document.querySelector("#header-article");
const totalUser = document.querySelector("#total-user");
const totalArticle = document.querySelector("#total-article");

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

function getTotalUser() {
    fetch('http://localhost:5133/api/User/total')
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            let amountUser = "";
            amountUser = `
                <i class="bi bi-people-fill icon"></i>
                <h4 class="total-title">Total Users</h4>
                <p class="total-user">${data}</p>
                `;

            totalUser.innerHTML = amountUser;
        })
        .catch(error => console.log(error));
}

function getTotalArticle() {
    fetch('http://localhost:5133/api/Article/total')
        .then(res => {
            return res.json();
        }).then((data) => {
            console.log(data);
            let amountArticle = "";
            amountArticle = `
         <i class="bi bi-journal-album icon"></i>
        <h4 class="total-title">Total Articles</h4>
        <p class="total-user">${data}</p>
        `;
            totalArticle.innerHTML = amountArticle;
        })
        .catch((error) => console.log(error))
}

function displayUser() {

    fetch('http://localhost:5133/api/User/view')
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);

            if (data.length !== 0 && tableBody !== "") {
                let listUser = "";
                data.map((values) => {
                    listUser += `
                                <div class="table-row">
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

function displayArticle() {
    fetch('http://localhost:5133/api/Article/view')
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);

            if (data.length !== 0 && tableBodyArticle !== "") {
                let listArticle = "";
                data.map((values) => {
                    listArticle += `
            <div class="table-row">
                 <div class="table-row-cell">
                    ${values.articleTitle}
                </div>
                <div class="table-row-cell">
                    ${values.category}
                </div>
                <div class="table-row-cell">
                    ${values.authorName}
                </div>
                <div class="table-row-cell">
                    ${values.date}
                </div>
            </div>
             `;
                });

                tableBodyArticle.innerHTML = listArticle;


            } else {

                tableHeaderArticle.innerHTML = ` 
                <p class="no-article">Article are not available!<p>
                `;
            }

        })
        .catch(error => console.log(error));
}

displayUser();
displayArticle();
getTotalUser();
getTotalArticle();