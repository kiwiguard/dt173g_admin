<?php 
include('config.php');

// /* Check if user is logged in */
// if(!isset($_SESSION['username'])) {
//     header('Location: index.php?message=Du måste logga in!');
// }

include('includes/header.php');
?>
    <a href="logout.php">Logga ut</a>
    <div id="updateEduDiv" style="display:none;">
    </div>
    <section>
        <h3>Lägg till utbildning</h3>
        <form method="POST" id="eduForm">
            <label for="university">Skola</label>
            <input type="text" name="university" id="university" require>
            <label for="eduName">Programmets/kursens nam</label>
            <input type="text" name="eduName" id="eduName" require>
            <label for="eDescription">Beskrivning</label>
            <input type="textarea" name="eDescription" id="eDescription" require>
            <label for="start_date">Utbildningen började</label>
            <input type="date" name="start_date" id="start_date" require>
            <label for="end_date">Utbildningen avslutades</label>
            <input type="date" name="end_date" id="end_date" require>
            <input type="submit" name="addEdu" id="addEdu" value="Lägg till utbildning">
        </form>

        <h2>Mina utbildningar</h2>
        <div class="eduDiv" id="eduDiv">
            <!-- JS inserts database result here -->
        </div>
    </section>
    <hr>
    <section>
        <div id="updateWorkDiv" style="display:none;"></div>
        <h3>Lägg till anställning</h3>
        <form method="POST" id="workForm">
            <label for="employer">Företag</label>
            <input type="text" name="employer" id="employer" require>
            <label for="workTitle">Titel</label>
            <input type="text" name="workTitle" id="workTitle" require>
            <label for="description">Beskrivning</label>
            <input type="textarea" name="description" id="description" require>
            <label for="workStart_date">Anställningen började</label>
            <input type="date" name="workStart_date" id="workStart_date" require>
            <label for="workEnd_date">Anställningen avslutades</label>
            <input type="date" name="workEnd_date" id="workEnd_date" require>
            <input type="submit" name="addWork" id="addWork" value="Lägg till anställning">
        </form>

        <h2>Mina Anställningar</h2>
        <div class="workDiv" id="workDiv">
            <!-- JS inserts database result here -->
        </div>
    </section>

    <hr>
    <section>
        <div id="updateProjectDiv" style="display:none;" enctype="muiltipart/form-data"></div>
        <h3>Lägg till ett projekt</h3>
        <form method="POST" id="projectForm">
            <label for="pTitle">Titel</label>
            <input type="text" name="pTitle" id="pTitle" require>
            <label for="pDescription">Beskrivning</label>
            <input type="text" name="pDescription" id="pDescription" require>
            <label for="pUrl">Ange Url till projektet</label>
            <input type="text" name="pUrl" id="pUrl" require>
            <label for="pImg">Ange filnamn för bild</label>
            <input type="text" name="pImg" id="pImg" require>
            <input type="submit" name="addProject" id="addProject" value="Lägg till projektet">
        </form>

        <h2>Mina projekt</h2>
        <div class="projectDiv" id="projectDiv">
            <!-- JS inserts database result here -->
        </div>
    </section>
<?php
    include('includes/footer.php');