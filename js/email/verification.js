/*
 * Author: Apache X692 Attack Helicopter
 * Created on: 25/06/2024
 */
async function verifyEmail() {
    const verificationStatusElement = document.getElementById("verification-status");

    const searchParams = new URLSearchParams(
        new URL(window.location.href).search
    );
    const token = searchParams.get("token");

    if (token == null) {
        showNotification(
            "Error",
            "This link is invalid or has expired.",
            "danger"
        );
        return;
    }

    const response = await fetch(
        `http://192.168.0.106:5064/api/user/activate/${token}`
    );
    if (response.status == 200) {
        verificationStatusElement.textContent = "Verified!";
        verificationStatusElement.className = "text-success";
    } else {
        verificationStatusElement.textContent = "Verification Failed!";
        verificationStatusElement.className = "text-danger";
    }
}

verifyEmail();
