/*
 * Author: Apache X692 Attack Helicopter
 * Created on: 14/06/2024
 */
async function sendFormData(username, password) {
    const response = await fetch(
        "http://192.168.0.106:5064/api/jwt", {
            method: "GET",
            headers: generateHeaderBasicAuth(username, password)
        }
    );

    if (response.status == 200) {
        showNotification(
            "Log-in Successful!",
            "You have been successfully logged-in to the website. 🔑",
            "success"
        );

        return await response.json();
    }
}

if (isLoggedIn()) redirectTo("/");

const formElement = document.querySelector("form");

formElement.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(formElement);

    sendFormData(formData.get("username"), formData.get("password"))
    .then(tokens => {
        setJwt(tokens["accessToken"], tokens["refreshToken"]);
        window.location.href = "/";
    });
});
