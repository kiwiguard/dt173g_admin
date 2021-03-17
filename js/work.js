'use strict'

/***************** Access variables *****************/

//development
// const workFetchURL = 'http://localhost/DT173G_Projekt/rest/api/work.php';

//deployment
const workFetchURL = 'https://susanne-nilsson.se/src/api/work.php'


//update div functions
const updateWorkDiv = document.getElementById('updateWorkDiv');
const closeUpdateWorkDiv = () => {updateWorkDiv.style.display = 'none';

}
/***************** Education *****************/

// varaibles
const workDiv = document.getElementById('workDiv'); //div that displays stored educations in database
const addWorkBtn = document.getElementById('addWork'); //submit button for add education form
let employerInput = document.getElementById('employer');
let workTitleInput = document.getElementById('workTitle');
let descriptionInput = document.getElementById('description');
let workStart_dateInput = document.getElementById('workStart_date');
let workEnd_dateInput = document.getElementById('workEnd_date');

//eventlisteners
window.onload = getWork(); // load stored data on load
addWorkBtn.addEventListener('click', addWork); // runt post function och form submit

// GET 
function getWork() {
    workDiv.innerHTML = '';

    fetch(workFetchURL)
    .then(response => response.json())
    .then(res => {
        res.forEach(work => {
            workDiv.innerHTML +=
            `<div class="work">
            <h3>${work.employer}</h3>
            <h4>${work.workTitle}</h4>
            <p>${work.description}</p>
            <p>${work.workStart_date} - ${work.workEnd_date}</p>
            <button work_id="${work.id}" onClick="getOneWorkToUpdate(${work.id})">Uppdatera</button>
            <button work_id="${work.id}" onClick="deleteWork(${work.id})">Radera</button>
            </div>`;
        });
    })
}

// POST
function addWork(event) {
    let employer = employerInput.value;
    let workTitle = workTitleInput.value;
    let description = descriptionInput.value;
    let workStart_date = workStart_dateInput.value;
    let workEnd_date = workEnd_dateInput.value;

    // store objects in variable
    let work = {'employer' : employer, 'workTitle' : workTitle, 'description' : description, 'workStart_date' : workStart_date, 'workeEnd_date' : workEnd_date};
    event.preventDefault();

    fetch(workFetchURL, {
        method: 'POST',
        body: JSON.stringify(work)
    }).then(response => response.json())
        .then(console.log('Work experience added.'))
        .then(data => {
            getWork();
        })
    .catch(error => {
        console.log('Error: ', error);
    })

    //clear input form
    employerInput.value = '';
    workTitleInput.value = '';
    descriptionInput.value = '';
    workStart_dateInput.value = '';
    workEnd_dateInput.value = '';
}

// Fetch one to Update
function getOneWorkToUpdate(id) {
    fetch(workFetchURL + '?id=' + id)
    .then(response => response.json())
    .then(updateWorkDiv.style.display = 'block')
    .then(res => {
        updateWorkDiv.innerHTML +=
        `<form method="POST">
            <h3>Uppdatera post</h3>
            <label for="employer">Företag</label><br>
            <input type="text" name="employer" id="newEmployer" value="${res.employer}"><br>
            <label for="workTitle">Titel</label><br>
            <input type="text" name="workTitle" id="newWorkTitle" value="${res.workTitle}"><br>
            <label for="description">Beskrivning</label><br>
            <textarea name="description" id="newDescription" value="${res.description}"></textarea><br>
            <label for="start_date">Anställningen började</label><br>
            <input type="date" name="start_date" id="newWorkStart" value="${res.workStart_date}"><br>
            <label for="end_date">Anställningen avslutades</label><br>
            <input type="date" name="end_date" id="newWorkEnd" value="${res.workEnd_date}"><br>
            <input type="submit" id="updateWorkBtn" onClick="updateWork(${res.id})" value="Uppdatera anställning">
            <input type="submit" id="closeBtn" onClick="closeUpdateWorkDiv()" value="Avbryt">
        </form>`
    })
}

// PUT
function updateWork(id) {

    let newEmployer = document.getElementById('newEmployer');
    let newWorkTitle = document.getElementById('newWorkTitle');
    let newDescription = document.getElementById('newDescription');
    let newWorkStart = document.getElementById('newWorkStart');
    let newWorkEnd = document.getElementById('newWorkEnd');

    newEmployer = newEmployer.value;
    newWorkTitle = newWorkTitle.value;
    newDescription = newDescription.value;
    newWorkStart = newWorkStart.value;
    newWorkEnd = newWorkEnd.value;

    let work = {'id' : id, 'employer' : newEmployer, 'workTitle' : newWorkTitle, 'description' : newDescription, 'workStart_date' : newWorkStart, 'workEnd_date' : newWorkEnd};

    fetch(workFetchURL + '?id=' + id, {
        method: 'PUT',
        body: JSON.stringify(work)
    })
    .then(response => response.json())
    .then(data => {
        getWork();
    })
    .catch(error => {
        console.log('Error: ', error);
    })
}


// DELETE
function deleteWork(id) {
    fetch(workFetchURL + '?id=' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        getWork();
    })
    .catch(error => {
        console.log('Error: ', error)
    })
}
