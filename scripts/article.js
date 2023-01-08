let modal = document.getElementById('id01');
const tableBody = document.getElementById("body");
const tableHeaderArticle = document.getElementById("header-article");
const pb = new PocketBase('http://127.0.0.1:8090');


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

function displayArticle() {

    fetch('http://localhost:5133/api/Article').
    then(res => {
        return res.json();
    }).then(data => {
        console.log(data);
        if (data.length !== 0 && tableBody !== "") {
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
                    <div class="table-row-cell">
                        <div class="actions">
                            <button class="edit" onclick="idToLocalStorage('${values.articleID}', '${values.createdRecordImage}', '${values.createdRecordVideo}')">
                            <a href="admin-edit-article.html" onclick="idToLocalStorage('${values.articleID}', '${values.createdRecordImage}', '${values.createdRecordVideo}')" class="edit-text"><p>Edit</p></a>
                            <a href="admin-edit-article.html" onclick="idToLocalStorage('${values.articleID}', '${values.createdRecordImage}', '${values.createdRecordVideo}')" class="icon-edit"><i class="bi bi-pencil-fill"></i></a>
                        </button>
                        <button class="button-trash" onclick="document.getElementById('id${values.articleID}').style.display='block'">
                        <i class="bi bi-trash-fill icon-trash"></i>
                    </button>
                        </div>
                    </div>
                </div>
            <div id="id${values.articleID}" class="modal">
                <div class="modal-content">
                    <div class="container">
                        <h1>Delete Article</h1>
                        <p class="p-delete">Are you sure you want to delete this article?</p>
        
                        <div class="clearfix">
                            <button type="button" onclick="document.getElementById('id${values.articleID}').style.display='none'" class="cancelbtn">Cancel</button>
                            <button type="button" onclick="deleteButton('${values.articleID}','${values.createdRecordImage}','${values.createdRecordVideo}')" class="deletebtn">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
                `;

            });
            tableBody.innerHTML = listArticle;
        } else {
            tableHeaderArticle.innerHTML = ` 
            <p class="no-user">Article are not available!<p>
            `;
        }
    })
}

async function deleteButton(articleID, createdRecordImage, createdRecordVideo) {

    const deleteImagePB = await pb.collection('imagearticle').delete(
        createdRecordImage, {
            'image': null
        }
    );

    const deleteVideoPB = await pb.collection('videoarticle').delete(
        createdRecordVideo, {
            'video': null
        }
    );

    console.log(deleteImagePB);
    console.log(deleteVideoPB);

    fetch('http://localhost:5133/api/Article/' + articleID, {

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
            alert("Article Successful Deleted");
        })
        .then(() => {
            location.reload();
        })
        .catch(error => console.log(error));
}

function idToLocalStorage(articleID, createdRecordImage, createdRecordVideo) {
    sessionStorage.setItem("articleID", articleID);
    sessionStorage.setItem("createdRecordImage", createdRecordImage);
    sessionStorage.setItem("createdRecordVideo", createdRecordVideo);
}

displayArticle();