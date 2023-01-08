const articleImage = document.getElementById("article-image");
const articleText = document.getElementById("article-text");
const mainArticle = document.getElementById("main-article");

function article() {
    let articleID = localStorage.getItem("articleID");

    fetch('http://localhost:5133/api/Article/' + articleID)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);

            let Image = "";
            let text = "";
            let main = "";
            Image += `
                <img src="${data.image}" alt="article.png" />
                `;
            text += `
                <p class="article_category">${data.category}</p>
                <p class="article_title">
                    ${data.articleTitle}
                </p> 
                `;

            main += `
            <div class="header_author">
            <div class="author_section">
                <p class="author_name">${data.authorName}</p>
                <div class="ver"></div>
                <p class="date">${data.date}</p>
            </div>
            <div class="wishlist_section">
                <button onclick="addMyList()" class="navbar_link_icon">
                    <i class="bi bi-heart"></i>
                </button>
            </div>
        </div>
        <hr class="line_header" />
        <div class="content">
            <div class="content_paragraph1">
                <p class="paragraph1">
                ${data.articleParagraph1}
                </p>
            </div>

            <center class="content_video">
                <video controls class="video">
                        <source src="${data.video}" />
                        Your browser does not support the video tag
                    </video>
            </center>
            <div class="content_paragraph2">
                <p class="paragraph2">
                ${data.articleParagraph2}
                </p>
            </div>
        </div>
            `;

            articleImage.innerHTML = Image;
            articleText.innerHTML = text;
            mainArticle.innerHTML = main;

        })
        .catch(error => console.log(error));
}

function addMyList() {
    let UserID = localStorage.getItem("UserID");
    let ArticleID = localStorage.getItem("articleID");

    fetch('http://localhost:5133/api/MyList/AddMyList', {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userid: UserID,
                articleid: ArticleID
            }),
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            // localStorage.setItem("userid", UserID);
            // localStorage.setItem("articleid" + ArticleID);
        })
        .then(() => {
            location.reload();
        })
        .catch(error => console.log(error));
    alert("Item added to your wishlist");
}

article();