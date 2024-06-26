/*
 * Author: Apache X692 Attack Helicopter
 * Created on: 26/06/2024
 */
var userId = null;

async function getUserDetails() {
    try {
        const response = await fetch(
            "http://192.168.0.106:5064/api/user/profile", {
                method: "GET",
                headers: generateHeaderJwt()
            }
        );

        if (response.status == 200) {
            const data = await response.json();
            userId = data["id"];

            return data;
        }
    } catch {
        showNotification(
            "Network Error",
            "An network error occured when attempting to fetch resources.",
            "danger"
        );
    }
}

async function sendGeneralFormData(formData) {
    try {
        const response = await fetch(
            "http://192.168.0.106:5064/api/user/" + userId, {
                method: "PUT",
                headers: generateHeaderJwt(),
                body: JSON.stringify(formData)
            }
        );

        if (response.status == 200)
            showNotification(
                "Update Successful",
                "Your data has been updated successfully!",
                "success"
            );

        console.log(await response.json());
    } catch {
        throw new Error();
    }
}

async function sendEmailFormData() {

}

async function sendPasswordFormData() {

}

function displayData(data) {
    document.getElementById("name-input").value = data["fullName"];
    document.getElementById("username-input").value = data["username"];
    document.getElementById("email-input").value = data["email"];
    document.getElementById("phone-input").value = data["phone"];
}

if (!isLoggedIn()) redirectTo("/");

getUserDetails()
.then(data => {
    displayData(data);
});

const generalFormElement = document.getElementById("general-form");

generalFormElement.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(generalFormElement);
    const formDataObject = {};

    for (let [key, value] of formData.entries())
        formDataObject[key] = value;

    showNotification(
        "Information",
        "You're data is being updated... 👨"
    );

    sendGeneralFormData(formDataObject);
});

const emailFormElement = document.getElementById("email-form");

emailFormElement.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(emailFormElement);
    const formDataObject = {};

    for (let [key, value] of formData.entries())
        formDataObject[key] = value;

    showNotification(
        "Information",
        "You're password is being changed... 👨"
    );
});

const passwordFormElement = document.getElementById("password-form");

passwordFormElement.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(passwordFormElement);
    const formDataObject = {};

    for (let [key, value] of formData.entries())
        formDataObject[key] = value;

    showNotification(
        "Information",
        "You're email is being updated... 👨"
    );
});
