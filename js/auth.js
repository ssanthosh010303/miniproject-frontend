/*
 * Author: Apache X692 Attack Helicopter
 * Created on: 24/06/2024
 */
function setJwt(accessToken, refreshToken = null) {
    localStorage.setItem("accessToken", accessToken);

    if (refreshToken != null)
        localStorage.setItem("refreshToken", refreshToken);
}

function getJwt(isRefreshToken) {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = null;

    if (accessToken == null)
        throw new Error("Access token is not found.");

    if (!isRefreshToken)
        return accessToken;

    refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken == null)
        throw new Error("Refresh token is not found.");

    return {
        "accessToken": accessToken,
        "refreshToken": refreshToken
    };
}

function clearJwt() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

function isLoggedIn() {
    return localStorage.getItem("accessToken") != null;
}

function setNavbar(isLoggedIn) {
    const logInElement = document.getElementById("log-in-handler");
    const signUpElement = document.getElementById("sign-up-handler");
    const logOutElement = document.getElementById("log-out-handler");
    const profileElement = document.getElementById("profile-handler");

    if (isLoggedIn) {
        logInElement.style.display = "none";
        signUpElement.style.display = "none";
        logOutElement.style.display = "block";
        profileElement.style.display = "block";
    } else {
        logInElement.style.display = "block";
        signUpElement.style.display = "block";
        logOutElement.style.display = "none";
        profileElement.style.display = "none";
    }
}

function redirectTo(page) {
    switch (page) {
        case "log-in":
            window.location.href = "/pages/log-in.html";
            break;
        case "unauthorized":
            window.location.href = "/";
    }
}

function generateHeaderJwt() {
    return {
        "Authorization": `Bearer ${getJwt(refreshToken=false)}`,
        "Content-Type": "application/json"
    };
}

function generateHeaderBasicAuth(username, password) {
    const token = btoa(unescape(encodeURIComponent(`${username}:${password}`)));

    return {
        "Authorization": `Basic ${token}`,
        "Content-Type": "application/json"
    };
}

async function refreshToken() {

}

function logOut() {

}

function handleUnauthorizedRequest() {
    refreshToken()
    .then(refreshedAccessToken => {
        setJwt(accessToken = refreshedAccessToken)
    });
}
