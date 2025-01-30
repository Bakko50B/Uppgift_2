"use strict";

let courses = [];

window.onload = () => {
    getCourses();
}

async function getCourses() {
    try {
        const response = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json");
        if (!response.ok) {
            throw new Error("Fel vid anslutningen!");
        }
        courses = await response.json();
        console.table(courses);
        printCourses(courses);
    }
    catch (error){
        console.error(error);
        document.querySelector("#errormessage").innerHTML = "<p>Fel vid hämntning av informationen!</p>";
    }
}


function printCourses(data){
    const myTbodyEl = document.getElementById("courseTBody");

    myTbodyEl.innerHTML = "";

    data.forEach(row => { 
        myTbodyEl.innerHTML += `<tr><td> ${row.code}</td> <td> ${row.coursename}</td> <td> ${row.progression}</td></tr>`;

        
    });

}




/* Datum i footern*/

// const MyDateEl = document.getElementById("date");
// const today = new Date();
// const date = String(today.getDate()).padStart(2, '0');
// const month = String(today.getMonth() + 1).padStart(2, '0'); // Månaderna är 0-indexerade, så vi lägger till 1
// const year = today.getFullYear();

// const fullDate = `${year}-${month}-${date}`;


// MyDateEl.innerHTML =
//     `    
//     Dagens datum:   <br>
//     ${fullDate}
// `;

/* Slut datum*/