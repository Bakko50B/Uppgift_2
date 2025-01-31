"use strict";

let courses = [];
let sortOrder = 1; // 1 = stigande, -1 = fallande

window.onload = () => {
    getCourses();
}

document.querySelectorAll("th[data-column]").forEach(th => {
    th.addEventListener("click", () => {
        let column = th.getAttribute("data-column");
        sortCourses(column);
        
    });
});

function sortCourses(column) {
    courses.sort((a, b) => {
        let valA = a[column].toString().toLowerCase();
        let valB = b[column].toString().toLowerCase();

        return valA > valB ? sortOrder : -sortOrder;
    });

    sortOrder *= -1; // Växla sorteringsordning

    printCourses(courses); // Uppdatera tabellen
    
    
}

async function getCourses() {
    try {
        const response = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json");
        if (!response.ok) {
            throw new Error("Fel vid anslutningen!");
        }
        courses = await response.json();
        // console.table(courses);
        printCourses(courses);
    }
    catch (error) {
        console.error(error);
        document.querySelector("#errormessage").innerHTML = "<p>Fel vid hämntning av informationen!</p>";
    }
}

function printCourses(data) {
    const myTbodyEl = document.getElementById("courseTBody");

    if (myTbodyEl) {
        myTbodyEl.innerHTML = "";

        data.forEach(row => {
            myTbodyEl.innerHTML += `<tr><td> ${row.code}</td> <td> ${row.coursename}</td> <td> ${row.progression}</td></tr>`;
        });
    }
}

// function sortOnName(data) {
//     data.sort((a, b) => a.coursename > b.coursename ? 1 : -1);
//     console.table(data);
// }

// function sortOnProgress(data) {
//     data.sort((a, b) => a.progression > b.progression ? 1 : -1);
//     console.table(data);
// }

// function sortOnCode(data) {
//     data.sort((a, b) => a.code > b.code ? 1 : -1);
//     console.table(data);
// }

/* Datum i footern*/

const MyDateEl = document.getElementById("date");
const today = new Date();
const date = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0'); // Månaderna är 0-indexerade, så vi lägger till 1
const year = today.getFullYear();

const fullDate = `${year}-${month}-${date}`;


MyDateEl.innerHTML =
    `    
    Dagens datum:   <br>
    ${fullDate}
`;

/* Slut datum*/