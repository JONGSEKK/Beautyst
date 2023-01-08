function logoutUser() {
    localStorage.removeItem("Email");
    localStorage.removeItem("UserID");
    window.location.href = "index.html";
}