/*
 * Author: Apache X692 Attack Helicopter
 * Created on: 24/06/2024
 */
async function sendFormData(formData) {
    try {
        const response = await fetch(
            "http://192.168.0.106:5064/pages/admin/", {
                method: "POST",
                headers: generateHeaderJwt(),
                body: JSON.stringify(formData)
            });

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
    } catch(error) {
        console.log(error);
        showNotification(
            "Error",
            "A network error occured when attempting to make a request. 🌐",
            "danger"
        );
        throw new Error();
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
        "Movie is being created... 🎬"
    );

    sendFormData(formDataObject);
});
