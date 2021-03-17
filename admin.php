<?php 
include('config.php');

// /* Check if user is logged in */
// if(!isset($_SESSION['username'])) {
//     header('Location: index.php?message=Du måste logga in!');
// }

include('includes/header.php');
?>
    <a href="logout.php">Logga ut</a>
    </div>
    <section class="grid-2">
        <div class="left">
        <h2 class="gold">Mina utbildningar</h2>
        <h3>Lägg till utbildning</h3>
            <form method="POST" id="eduForm">
                <label for="university">Skola</label><br>
                <input type="text" name="university" id="university" require><br>
                <label for="eduName">Programmets/kursens nam</label><br>
                <input type="text" name="eduName" id="eduName" require><br>
                <label for="eDescription">Beskrivning</label><br>
                <textarea name="eDescription" id="eDescription" require>
                </textarea><br>
                <label for="start_date">Utbildningen började</label><br>
                <input type="date" name="start_date" id="start_date" require><br>
                <label for="end_date">Utbildningen avslutades</label><br>
                <input type="date" name="end_date" id="end_date" require><br>
                <input type="submit" class="button" name="addEdu" id="addEdu" value="Lägg till utbildning">
            </form>
            <div id="updateEduDiv" style="display:none;"></div>
        </div>
        <div class="right">
            <div class="eduDiv" id="eduDiv">
                <!-- JS inserts database result here -->
            </div>
        </div>
    </section>
    <hr>
    <section class="grid-2">
        <div class="left">
            <h2 class="gold">Mina Anställningar</h2>
            <h3>Lägg till anställning</h3>
            <form method="POST" id="workForm">
                <label for="employer">Företag</label><br>
                <input type="text" name="employer" id="employer" require><br>
                <label for="workTitle">Titel</label><br>
                <input type="text" name="workTitle" id="workTitle" require><br>
                <label for="description">Beskrivning</label><br>
                <textarea name="description" id="description" require>
                </textarea><br>
                <label for="workStart_date">Anställningen började</label><br>
                <input type="date" name="workStart_date" id="workStart_date" require><br>
                <label for="workEnd_date">Anställningen avslutades</label><br>
                <input type="date" name="workEnd_date" id="workEnd_date" require><br>
                <input type="submit" class="button" name="addWork" id="addWork" value="Lägg till anställning">
            </form>
            <div id="updateWorkDiv" style="display:none;"></div>
        </div>

        <div class="right">
            <div class="workDiv" id="workDiv">
                <!-- JS inserts database result here -->
            </div>
        </div>
    </section>

    <hr>
    <section class="grid-2">
        <div class="left">
            <h2 class="gold">Mina projekt</h2>
            <h3>Lägg till ett projekt</h3>
            <form method="POST" id="projectForm">
                <label for="pTitle">Titel</label><br>
                <input type="text" name="pTitle" id="pTitle" require><br>
                <label for="pDescription">Beskrivning</label><br>
                <textarea name="pDescription" id="pDescription" rows="4" cols="50" require>
                </textarea><br>
                <label for="pUrl">Ange Url till projektet</label><br>
                <input type="text" name="pUrl" id="pUrl" require><br>
                <label for="pImg">Ange filnamn för bild</label><br>
                <input type="text" name="pImg" id="pImg" require><br>
                <input type="submit" class="button" name="addProject" id="addProject" value="Lägg till projektet">
            </form>
            <div id="updateProjectDiv" style="display:none;" enctype="muiltipart/form-data"></div>
        </div>
        <div class="rigth">
            <div class="projectDiv" id="projectDiv">
                <!-- JS inserts database result here -->
            </div>
        </div>
    </section>
<?php
    include('includes/footer.php');