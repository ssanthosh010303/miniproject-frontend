/*
 * Author: Apache X692 Attack Helicopter
 * Created on: 14/06/2024
 */
function generateHeaderBasicAuth(username, password) {
    const token = btoa(unescape(encodeURIComponent(`${username}:${password}`)));

    return {
        "Authorization": `Basic ${token}`,
        "Content-Type": "application/json"
    };
}

function setJwt(accessToken, refreshToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
}

async function sendFormData(formData) {
    try {
        const response = await fetch(
            "http://192.168.0.106:5064/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        );
        const data = await response.json();

        if (response.status == 200) {
            showNotification(
                "Sign-up Successful",
                "Please check your email to activate your account. ✉️",
                "success"
            );

            return data;
        }

        if (response.status == 500)
            showNotification(
                "Our Servers Went Brr...",
                "We're working on it. Sorry for the inconvenience. 🙇",
                "danger"
            );

        if (response.status == 400)
            for (const [field, errors] of Object.entries(data.errors))
                for (const error of errors)
                    showNotification(
                        "Invalid Entry: " + field,
                        error + " ❌",
                        "warning"
                    );
    } catch {
        showNotification(
            "Error",
            "A network error occured when attempting to make a request. 🌐",
            "danger"
        );
        throw new Error();
    }
}

async function getSetJwt(username, password) {
    try {
        const response = await fetch(
            "http://192.168.0.106:5064/api/jwt", {
                headers: generateHeaderBasicAuth(username, password)
            }
        );

        const data = await response.json();

        if (response.status != 200) {
            sendNotification(
                "Error",
                "Our servers are unable to process your account creation.",
                "danger"
            );
        }

        setJwt(data["accessToken"], data["refreshToken"]);
    } catch {
        showNotification(
            "Error",
            "A network error occurred when attempting to make a request. 🌐",
            "danger"
        );
    }
}

const formElement = document.querySelector("form");

formElement.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(formElement);
    const formDataObject = {};

    for (let [key, value] of formData.entries())
        formDataObject[key] = value;

    showNotification(
        "Information",
        "You're account is being created... 👨"
    );

    sendFormData(formDataObject)
    .then(data => {
        getSetJwt(formDataObject["username"], formDataObject["password"]);
    });
});
