'use strict'

/***************** Access variables *****************/

//development
// const eduFetchURL = 'http://localhost/DT173G_Projekt/rest/api/education.php';

//deployment
const eduFetchURL = 'https://susanne-nilsson.se/src/api/education.php'


//update div functions
const updateEduDiv = document.getElementById('updateEduDiv');
const closeDiv = () => {updateEduDiv.style.display = 'none';

}
/***************** Education *****************/

// varaibles
const eduDiv = document.getElementById('eduDiv'); //div that displays stored educations in database
const addEduBtn = document.getElementById('addEdu'); //submit button for add education form
let universityInput = document.getElementById('university');
let eduNameInput = document.getElementById('eduName');
let eDescriptionInput = document.getElementById('eDescription');
let start_dateInput = document.getElementById('start_date');
let end_dateInput = document.getElementById('end_date');

//eventlisteners
window.onload = getEdu(); // load stored data on load
addEduBtn.addEventListener('click', addEdu); // runt post function och form submit

// GET 
function getEdu() {
    eduDiv.innerHTML = '';

    fetch(eduFetchURL)
    .then(response => response.json())
    .then(res => {
        res.forEach(edu => {
            eduDiv.innerHTML +=
            `<div class="edu">
            <h3>${edu.university}</h3>
            <h4>${edu.eduName}</h4>
            <p>${edu.eDescription}</p>
            <p>${edu.start_date} - ${edu.end_date}</p>
            <button edu_id="${edu.id}" onClick="getOneEduToUpdate(${edu.id})">Uppdatera</button>
            <button edu_id="${edu.id}" onClick="deleteEdu(${edu.id})">Radera</button>
            </div>`;
        });
    })
}

// POST
function addEdu(event) {
    let university = universityInput.value;
    let eduName = eduNameInput.value;
    let eDescription = eDescriptionInput.value;
    let start_date = start_dateInput.value;
    let end_date = end_dateInput.value;

    // store objects in variable
    let edu = {'university' : university, 'eduName' : eduName, 'eDescription' : eDescription, 'start_date' : start_date, 'end_date' : end_date};
    event.preventDefault();

    fetch(eduFetchURL, {
        method: 'POST',
        body: JSON.stringify(edu)
    }).then(response => response.json())
        .then(console.log('Education added.'))
        .then(data => {
            getEdu();
        })
    .catch(error => {
        console.log('Error: ', error);
    })

    //clear input form
    universityInput.value = '';
    eduNameInput.value = '';
    eDescriptionInput.value = '';
    start_dateInput.value = '';
    end_dateInput.value = '';
}

// Fetch one to Update
function getOneEduToUpdate(id) {
    fetch(eduFetchURL + '?id=' + id)
    .then(response => response.json())
    .then(updateEduDiv.style.display = 'block')
    .then(res => {
        updateEduDiv.innerHTML +=
        `<form method="GET">
            <h3>Uppdatera post</h3>
            <label for="university">Skola</label><br>
            <input type="text" name="university" id="newUni" value="${res.university}"><br>
            <label for="eduName">Programmets/kursens nam</label><br>
            <input type="text" name="eduName" id="newEduName" value="${res.eduName}"><br>
            <label for="eDescription">Beskrivning</label><br>
            <textarea name="eDescription" id="neweDescription" value="${res.eDescription}"></textarea<br>
            <label for="start_date">Utbildningen började</label><br>
            <input type="date" name="start_date" id="newStart" value="${res.start_date}"><br>
            <label for="end_date">Utbildningen avslutades</label><br>
            <input type="date" name="end_date" id="newEnd" value="${res.end_date}"><br>
            <input type="submit" id="updateEduBtn" onClick="updateEdu(${res.id})" value="Uppdatera utbildning">
            <input type="submit" id="closeBtn" onClick="closeDiv()" value="Avbryt">
        </form>`
    })
}

// PUT
function updateEdu(id) {

    let newUni = document.getElementById('newUni');
    let newEduName = document.getElementById('newEduName');
    let neweDescription = document.getElementById('neweDescription');
    let newStart = document.getElementById('newStart');
    let newEnd = document.getElementById('newEnd');

    newUni = newUni.value;
    newEduName = newEduName.value;
    neweDescription = neweDescription.value;
    newStart = newStart.value;
    newEnd = newEnd.value;

    let edu = {'id' : id, 'university' : newUni, 'eduName' : newEduName, 'eDescription' : neweDescription, 'start_date' : newStart, 'end_date' : newEnd};

    fetch(eduFetchURL + '?id=' + id, {
        method: 'PUT',
        body: JSON.stringify(edu)
    })
    .then(response => response.json())
    .then(data => {
        getEdu();
    })
    .catch(error => {
        console.log('Error: ', error);
    })
}


// DELETE
function deleteEdu(id) {
    fetch(eduFetchURL + '?id=' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        getEdu();
    })
    .catch(error => {
        console.log('Error: ', error)
    })
}
