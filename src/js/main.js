"use strict";

let courses = [];  //array som tilldelas det konverterade jsondatat
let sortOrder = 1; // Håller reda på sorteringsrikting 1 = stigande, -1 = fallande

window.onload = () => {
    getCourses();
    
}
// egen variabel för att filtrera
const myFilterEl = document.getElementById("filter");
// Sätter eventlistener om elementet finns
if(myFilterEl){
    myFilterEl.addEventListener("input", filterData);
}

// itererar över alla th i thead och sätter eventlisteners på dem med tillhörande funktion
document.querySelectorAll("th[data-column]").forEach(th => {
    th.addEventListener("click", () => {
        let column = th.getAttribute("data-column");   // Hämtar attributet på data-column
        sortCourses(column);        
    });
});


function sortCourses(column) {
    courses.sort((a, b) => (a[column] > b[column] ? sortOrder : -sortOrder));   //slutlig version på min sorteringsalgoritm                                           
    sortOrder *= -1; // Växla sorteringsordning
    printCourses(courses); // Uppdatera tabellen
}

/* laddar in jsonfil med async/await */
async function getCourses() {
    try {
        const response = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json");
        if (!response.ok) {
            throw new Error("Fel vid anslutningen!");
        }
        courses = await response.json();  //data till globala variabeln
        printCourses(courses);              // skriver ut efter inladdning
    }
    catch (error) {
        console.error(error);
        document.querySelector("#errormessage").innerHTML = "<p>Fel vid hämntning av informationen!</p>";
    }
}

// "skriver ut" till DOM
function printCourses(data) {
    const myTbodyEl = document.getElementById("courseTBody");

    if (myTbodyEl) {
        myTbodyEl.innerHTML = "";
        data.forEach(row => {
            myTbodyEl.innerHTML += `<tr><td> ${row.code}</td> <td> ${row.coursename}</td> <td> ${row.progression}</td></tr>`;
        });
    }
}
/* 
Sparar dessa för "historiken" 
Jag började med uppgiften påp detta sätt. Separata funktioner för varje typ.
Men ville försöka (och lyckades efter lite googling) att skapa en funktion som hanterar sorteringen för alla kolumner
Den finns ovan 
*/


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

// Filtrerar data och "skriver ut"
function filterData(){
    const filterOption = document.getElementById("filter").value;   

    const filteredArr = courses.filter(course =>
        course.coursename.toLowerCase().includes(filterOption.toLowerCase()) ||
        course.code.toLowerCase().includes(filterOption.toLowerCase())
    );
    //skriver ut den "filtrerade" arrayen
    printCourses(filteredArr);
}


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