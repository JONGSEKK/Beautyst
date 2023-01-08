const formArticle = document.getElementById("article");
const authorname = document.getElementById("authorName");
const authortitle = document.getElementById("articleTitle");
const category = document.getElementById("category-select");
const image = document.getElementById("img");
const video = document.getElementById("vdo");
const paragraph1 = document.getElementById("textarea1");
const paragraph2 = document.getElementById("textarea2");
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


const updateFile = async() => {
    let articleID = sessionStorage.getItem("articleID");
    let createdRecordImage = sessionStorage.getItem("createdRecordImage");
    let createdRecordVideo = sessionStorage.getItem("createdRecordVideo");

    let file = image.files[0];
    let file2 = video.files[0];
    // console.log(file2);
    // console.log(file);
    let formData = new FormData();
    let formData2 = new FormData();
    formData.set('image', file);
    formData2.set('video', file2);

    // console.log(formData);
    // console.log(formData2);

    const updateImagePB = await pb.collection('imagearticle').update(
        createdRecordImage, formData
    );

    const updateVideoPB = await pb.collection('videoarticle').update(
        createdRecordVideo, formData2
    );

    // console.log(updateImagePB);
    // console.log(updateVideoPB);

    let newLinkImage = "http://127.0.0.1:8090/api/files/" + updateImagePB.collectionId + "/" + updateImagePB.id + "/" + updateImagePB.image;

    let newLinkVideo = "http://127.0.0.1:8090/api/files/" + updateVideoPB.collectionId + "/" + updateVideoPB.id + "/" + updateVideoPB.video;

    editArticle(articleID, newLinkImage, newLinkVideo, updateImagePB.id, updateVideoPB.id);
}

function editArticle(articleID, newLinkImage, newLinkVideo, updateImagePB, updateVideoPB) {
    let authornameValue = authorname.value;
    let authortitleValue = authortitle.value;
    let categoryValue = category.value;
    let paragraph1Value = paragraph1.value;
    let paragraph2Value = paragraph2.value;
    let date = dayjs().format('D MMMM YYYY');

    if (authornameValue !== "" && authortitleValue !== "" && categoryValue !== "" && paragraph1Value !== "" && paragraph2Value !== "") {
        fetch('http://localhost:5133/api/Article/' + articleID, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({
                    Category: categoryValue,
                    ArticleTitle: authortitleValue,
                    AuthorName: authornameValue,
                    Date: date,
                    Image: newLinkImage,
                    Video: newLinkVideo,
                    ArticleParagraph1: paragraph1Value,
                    ArticleParagraph2: paragraph2Value,
                    CreatedRecordImage: updateImagePB,
                    createdRecordVideo: updateVideoPB
                }),
            }).then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                localStorage.setItem("createdRecordImage", updateImagePB);
                localStorage.setItem("createdRecordVideo", updateVideoPB);
            })
            .then(() => {
                location.reload();
            })
            .catch(error => console.log(error));
        alert("Article Updated Successfully");
    } else {
        alert("Article Falied to Update");
    }


}

formArticle.addEventListener('submit', e => {
    e.preventDefault();

    updateFile();
});