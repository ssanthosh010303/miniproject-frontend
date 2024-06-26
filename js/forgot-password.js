function isLoggedIn() {
    return localStorage.getItem("accessToken") != null;
}

if (isLoggedIn()) {
    window.location.href = "/";
}
