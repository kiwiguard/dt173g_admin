'use strict'

/***************** Access variables *****************/

//development
// const projectFetchURL = 'http://localhost/DT173G_Projekt/rest/api/project.php';

//deployment
const projectFetchURL = 'https://susanne-nilsson.se/src/api/project.php'


//update div functions
const updateProjectDiv = document.getElementById('updateProjectDiv');
const closeProjectDiv = () => {updateDiv.style.display = 'none';

}
/***************** Projects *****************/

// varaibles
const projectDiv = document.getElementById('projectDiv'); //div that displays stored projects in database
const addProjBtn = document.getElementById('addProject'); //submit button for add project form
let pTitleInput = document.getElementById('pTitle');
let pDescInput = document.getElementById('pDescription');
let pUrlInput = document.getElementById('pUrl');
let imgInput = document.getElementById('pImg');
const imgFpath = '../../img/'

//eventlisteners
window.onload = getProject(); // load stored data on load
addProjBtn.addEventListener('click', addProject); // runt post function och form submit

// GET 
function getProject() {
    projectDiv.innerHTML = '';

    fetch(projectFetchURL)
    .then(response => response.json())
    .then(res => {
        res.forEach(proj => {
            projectDiv.innerHTML +=
            `<div class="proj">
            <h3>${proj.pTitle}</h3>
            <p>${proj.pDescription}</p>
            <a href="${proj.pUrl}">
                <img src="${imgFpath + proj.pImg}" width="500" height="500">
            </a>
            <button proj_id="${proj.id}" onClick="getOneProjToUpdate(${proj.id})">Uppdatera</button>
            <button proj_id="${proj.id}" onClick="deleteProject(${proj.id})">Radera</button>
            </div>`;
        });
    })
}

// POST
function addProject(event) {
    let pTitle = pTitleInput.value;
    let pDescription = pDescInput.value;
    let pUrl = pUrlInput.value
    let pImg = imgInput.value;

    // store objects in variable
    let proj = {'pTitle' : pTitle, 'pDescription' : pDescription, 'pUrl' : pUrl, 'pImg' : pImg};
    event.preventDefault();

    fetch(projectFetchURL, {
        method: 'POST',
        body: JSON.stringify(proj)
    }).then(response => response.json())
        .then(console.log('project added.'))
        .then(data => {
            getProject();
        })
    .catch(error => {
        console.log('Error: ', error);
    })
}

// Fetch one to Update
function getOneProjToUpdate(id) {
    fetch(projectFetchURL + '?id=' + id)
    .then(response => response.json())
    .then(updateProjectDiv.style.display = 'block')
    .then(res => {
        updateProjectDiv.innerHTML +=
        `<form method="POST" enctype="multipart/form-data">
            <h3>Uppdatera post</h3>
            <label for="pTitle">Titel</label><br>
            <input type="text" name="pTitle" id="newTitle" value="${res.pTitle}"><br>
            <label for="pDescription">Beskrivning</label><br>
            <textarea name="pDescription" id="newpDescription" value="${res.pDescription}"></textarea><br>
            <label for="pUrl">Ange Url till projektet</label><br>
            <input type="text" name="pUrl" id="newpUrl" value="${res.pUrl}" require><br>
            <label for="img">Ange filnamn för bilden</label><br>
            <input type="text" name="img" id="newpImg" value="${res.pImg}"><br>
            <input type="submit" id="updateProjBtn" onClick="updateProject(${res.id})" value="Uppdatera projekt">
            <input type="submit" id="closeBtn" onClick="closeProjectDiv()" value="Avbryt">
        </form>`
    })
}

// PUT
function updateProject(id) {

    let newTitle = document.getElementById('newTitle');
    let newpDescription = document.getElementById('newpDescription');
    let newpUrl = document.getElementById('newpUrl')
    let newpImg = document.getElementById('newpImg');

    newTitle = newTitle.value;
    newpDescription = newpDescription.value;
    newpUrl = newpUrl.value;
    newpImg = newpImg.value;

    let proj = {'id' : id, 'pTitle' : newTitle, 'pDescription' : newpDescription, 'pUrl' : newpUrl, 'pImg' : newpImg};

    fetch(projectFetchURL + '?id=' + id, {
        method: 'PUT',
        body: JSON.stringify(proj)
    })
    .then(response => response.json())
    // .then(data => {
    //     getProject();
    // })
    .catch(error => {
        console.log('Error: ', error);
    })
}


// DELETE
function deleteProject(id) {
    fetch(projectFetchURL + '?id=' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        getProject();
    })
    .catch(error => {
        console.log('Error: ', error)
    })
}
