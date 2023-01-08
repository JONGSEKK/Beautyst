let modal = document.getElementById('id01');
const wishlist = document.getElementById("wishlist-tutorial");
const headerWishList = document.getElementById("wishlist-header");

function wishList() {
    let UserID = localStorage.getItem("UserID");

    fetch('http://localhost:5133/api/MyList/GetList?id=' + UserID)
        .then(res => {
            return res.json();
        }).then(data => {
            console.log(data);

            if (data.length !== 0 && wishlist !== "") {

                let myList = ""

                data.map((values) => {
                    myList += `
                <div class="tutorials_card">
                    <div class="tutorials_item">
                        <a href="article.html?id=${values.articleID}" onclick="idToLocalStorage(${values.articleID})">
                            <img src="${values.image}" alt="" /> </a>
                        <p class="type">${values.category}</p>
                           <p class="description">
                            ${values.articleTitle}
                           </p> 
                           <button class="button-trash" style="cursor:pointer;" onclick="document.getElementById('id${values.listID}').style.display='block'">
                           <i class="bi bi-heart-fill wishlist_icon"></i>
                       </button>

                    </div>
                </div>

                <div id="id${values.listID}" class="modal">
                <div class="modal-content">
                    <div class="container">
                        <h1>Remove Item Wishlist</h1>
                        <p class="p-delete">Are you sure you want to remove the list?</p>
        
                        <div class="clearfix">
                            <button type="button" onclick="document.getElementById('id${values.listID}').style.display='none'" class="cancelbtn">Cancel</button>
                            <button type="button" onclick="deleteWishlist(${values.listID})" class="deletebtn">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
                `;
                });
                wishlist.innerHTML = myList;
            } else {
                headerWishList.innerHTML = ` 
                <p class="no-list">No Wishlist<p>
                `;
            }
        }).catch(error => console.log(error));
}

function idToLocalStorage(articleID) {
    localStorage.setItem("articleID", articleID);
}

function deleteWishlist(listID) {

    fetch('http://localhost:5133/api/MyList/DeleteList?id=' + listID, {
            method: "DELETE",
            mode: "cors",
            headers: {
                'Content-type': 'application/json;'
            },
        })
        .then(data => {
            console.log(data);

        })
        .then(() => {
            location.reload();
        })
        .catch(error => console.log(error));
}

wishList();