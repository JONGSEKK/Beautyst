function changeBg() {
    let navbar = document.querySelector(".navbar");
    let navbarLink = document.querySelector(".navbar_link");

    let scrollValue = window.scrollY;

    if (scrollValue < 500) {
        navbar.classList.remove("navbar-sticky-color");
        navbarLink.classList.remove(".navbar_link_sticky");
    } else {
        navbar.classList.add("navbar-sticky-color");
        navbarLink.classList.add(".navbar_link_sticky");
    }
}

window.addEventListener("scroll", changeBg);
