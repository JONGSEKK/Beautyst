const tutorial = document.getElementById("article-homepage");
const PopularArticle = document.getElementById("popular-article");

function displayArticleHomepage() {
    fetch('http://localhost:5133/api/Article/homepage')
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);

            if (data.length !== 0 && tutorial !== "") {
                let listArticle = "";

                data.map((values) => {
                    listArticle += `
                <div class="tutorials_card">
                <div class="tutorials_item">
                    <a href="article.html?id=${values.articleID}" onclick="idToLocalStorage(${values.articleID})">
                        <img src="${values.image}" alt="" /> </a>
                    <p class="type">${values.category}</p>
                       <p class="description">
                        ${values.articleTitle}
                       </p> 
                </div>
            </div>
                `;
                });

                tutorial.innerHTML = listArticle;
            }

        })
        .catch(error => console.log(error));
}

function idToLocalStorage(articleID) {
    localStorage.setItem("articleID", articleID);
}

function popularArticle() {
    fetch('http://localhost:5133/api/Article/popularArticle')
        .then(res => {
            return res.json();
        })
        .then(data => {

            console.log(data);

            if (data.length !== 0 && PopularArticle !== "") {
                let listPopularArticle = "";

                data.map((values) => {
                    listPopularArticle += `
         
                <hr class="popular_horizontal" />
                <div class="popular_item">
                    <h3 class="popular_date">${values.date}</h3>
                    <p class="popular_description">
                        ${values.articleTitle}
                    </p>
                </div>`;
                });

                PopularArticle.innerHTML = listPopularArticle;
            }

        })
        .catch(error => console.log(error));
}

popularArticle();
displayArticleHomepage()