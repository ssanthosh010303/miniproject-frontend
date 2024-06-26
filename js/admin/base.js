/*
 * Author: Apache X692 Attack Helicopter
 * Created on: 24/06/2024
 */

function hideAlert() {
    document.getElementById("alert").style.display = "none";
}

async function loadHtml(entity, hasToolbar=false) {
    try {
        const rootElement = document.getElementById("root-container");
        const tableFetchResponse = await fetch(`/pages/admin/partials/${entity}/table.html`);

        if (tableFetchResponse.status != 200)
            throw new Error();

        const tableHtml = await tableFetchResponse.text();

        rootElement.innerHTML = tableHtml;
    } catch {
        throw new Error();
    }
}

async function loadJs(entity) {
    try {
        const rootElement = document.getElementById("partial-js");
        const scriptElement = document.createElement("script");

        if (rootElement != null)
            rootElement.remove();

        scriptElement.id = "partial-js";
        scriptElement.src = `/js/admin/${entity}/table.js`;

        document.body.appendChild(scriptElement);
    } catch {
        throw new Error();
    }
}

function updateAddButton(entity) {
    const addElement = document.getElementById("add-entity-btn");

    addElement.href = `/pages/admin/${entity}/create.html`;
}

document.getElementById("entity-selector").addEventListener("change", function(event) {
    const entity = event.target.value;

    loadHtml(entity)
    .catch(error => {
        showNotification(
            "Error Occured",
            "Sorry, we couldn't load the page right now.",
            "danger"
        );

        return;
    });

    loadJs(entity)
    .catch(error => {
        showNotification(
            "Error Occured",
            "Sorry, we couldn't load the page right now.",
            "danger"
        );
    });

    hideAlert();
    updateAddButton(entity);
});
