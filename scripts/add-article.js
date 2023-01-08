const formArticle = document.getElementById("article");
const authorname = document.getElementById("authorName");
const authortitle = document.getElementById("articleTitle");
const category = document.getElementById("category-select");
const image = document.getElementById("img");
const video = document.getElementById("vdo");
const paragraph1 = document.getElementById("textarea1");
const paragraph2 = document.getElementById("textarea2");
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
formArticle.addEventListener('submit', e => {
    e.preventDefault();

    sendFile();
});




const sendFile = async() => {
    let file = image.files[0];
    let file2 = video.files[0];
    // console.log(file2);
    let formData = new FormData();
    let formData2 = new FormData();
    formData.set('image', file);
    formData2.set('video', file2);
    // console.log(formData);
    // console.log(formData2);
    const createdRecord = await pb.collection('imagearticle').create(formData);
    const createdRecord2 = await pb.collection('videoarticle').create(formData2);
    // console.log(createdRecord);
    // console.log(createdRecord2);

    // console.log(createdRecord2);
    // console.log(formData2);

    let linkImage = "http://127.0.0.1:8090/api/files/" + createdRecord.collectionId + "/" + createdRecord.id + "/" + createdRecord.image;

    let linkVideo = "http://127.0.0.1:8090/api/files/" + createdRecord2.collectionId + "/" + createdRecord2.id + "/" + createdRecord2.video;

    addArticle(linkImage, linkVideo, createdRecord.id, createdRecord2.id);

};


function addArticle(linkimageValue, linkvideoValue, createdRecordImage, createdRecordVideo) {
    let authornameValue = authorname.value;
    let authortitleValue = authortitle.value;
    let categoryValue = category.value;
    let paragraph1Value = paragraph1.value;
    let paragraph2Value = paragraph2.value;
    let date = dayjs().format('D MMMM YYYY');
    console.log(date);
    //console.log(authorName);
    //console.log(authorTitle);
    // console.log(category_value);
    // console.log(paragraph_1);
    // console.log(paragraph_2);
    // console.log(linkImage);
    // console.log(linkVideo);

    if (authornameValue !== "" && authortitleValue !== "" && categoryValue !== "" && paragraph1Value !== "" && paragraph2Value !== "") {
        fetch('http://localhost:5133/api/Article', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({
                    Category: categoryValue,
                    ArticleTitle: authortitleValue,
                    AuthorName: authornameValue,
                    Date: date,
                    Image: linkimageValue,
                    Video: linkvideoValue,
                    ArticleParagraph1: paragraph1Value,
                    ArticleParagraph2: paragraph2Value,
                    CreatedRecordImage: createdRecordImage,
                    createdRecordVideo: createdRecordVideo
                }),

            }).then(res => {
                return res.json();
            })
            .then(data => console.log(data))
            .then(() => {
                location.reload();
            })
            .catch(error => console.log(error));
        alert("Article Added Successfully");

    } else {
        alert("Article Failed to Upload");
    }
}