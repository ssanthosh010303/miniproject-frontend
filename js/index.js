/*
 * Author: Apache X692 Attack Helicopter
 * Created on: 14/06/2024
 */
function setTheme() {
    const isDarkThemePreferred = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    document.documentElement.setAttribute(
        "data-bs-theme", isDarkThemePreferred ? "dark" : "light"
    );
    document.body.className = "bg-" + (isDarkThemePreferred ? "black" : "light");
}

setTheme();
window.matchMedia("(prefers-color-scheme: dark)").addEventListener(
    "change", setTheme
);
