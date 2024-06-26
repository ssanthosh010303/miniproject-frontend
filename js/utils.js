/*
 * Author: Apache X692 Attack Helicopter
 * Created on: 14/06/2024
 */
TOAST = `<div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <div class="rounded p-2 me-2 bg-%TYPE%"></div>
    <strong class="me-auto">%TITLE%</strong>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">
    %MESSAGE%
  </div>
</div>
`

function setTheme() {
    const isDarkThemePreferred = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    document.documentElement.setAttribute(
        "data-bs-theme", isDarkThemePreferred ? "dark" : "light"
    );
    document.body.className = "bg-" + (isDarkThemePreferred ? "black" : "light");
}

function showNotification(title, message, type = "info") {
    const toastContainerElement = document.getElementById("toast-container");

    toastContainerElement.innerHTML += TOAST
        .replace("%TITLE%", title)
        .replace("%MESSAGE%", message)
        .replace("%TYPE%", type);
}

setTheme();
window.matchMedia("(prefers-color-scheme: dark)").addEventListener(
    "change", setTheme
);
