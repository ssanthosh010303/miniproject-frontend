/*
 * Author: Apache X692 Attack Helicopter
 * Created on: 24/06/2024
 */
TABLE_ROW = `<tr>
  <th>%ID%</th>
  <td>%NAME%</td>
  <td>
    <a class="btn btn-warning" href="/pages/admin/movie/update.html?id=%ID%">
      Update
    </a>
  </td>
  <td>
    <a id="delete-%ID%" class="btn btn-danger">
      Delete
    </a>
  </td>
</tr>
`

async function fetchData() {
    try {
        const response = await fetch("http://192.168.0.106:5064/api/movie");

        if (response.status != 200)
            throw new Error();

        const data = await response.json();

        return data;
    } catch {
        throw new Error();
    }
}

function loadTable(data) {
    const tableBodyElement = document.getElementById("table-body");

    tableBodyElement.innerHTML = "";

    for (const datum of data) {
        tableBodyElement.innerHTML += TABLE_ROW
            .replaceAll("%ID%", datum["id"])
            .replace("%NAME%", datum["name"]);
    }
}

fetchData()
.then(data => {
    loadTable(data);
});
