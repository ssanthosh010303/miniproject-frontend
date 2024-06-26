/*
 * Author: Apache X692 Attack Helicopter
 * Created on: 26/06/2024
 */
async function getData() {
    const searchParams = new URLSearchParams(
        new URL(window.location.href).search
    );
    const movieId = searchParams.get("id");

    if (movieId == null) return;

    const response = await fetch(
        "http://192.168.0.106:5064/api/movie/" + movieId
    );

    const data = await response.json();

    return data;
}

function updateBanner(data) {
    document.getElementById("movie-poster").src = data["illustration"];
    document.getElementById("movie-name").textContent = data["name"];
    document.getElementById("movie-description").textContent = data["description"];
}

function updateCastCrew() {

}

function updateReview() {

}

getData()
.then(data => {
    updateBanner(data); updateCastCrew(data); updateReview(data);
})
