<?php
include('config.php');

if(isset($_POST['username'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $username = strip_tags($username);
    $password = strip_tags($password);

    // check username and password input (hardcoded for now)
    if($username == 'admin' && $password == 'password') {
        $_SESSION['username'] = $username;
    
        header('Location: admin.php');
    } else {
        $message = '<p><br/> Felaktigt användarnamn eller lösenord!</p>';
    }
}

include('includes/header.php');
?>

<h1>Logga in</h1>
<form method="POST">
    <label for="username">Användarnamn:</label>
    <input type="text" id="username" name="username">
    <label for="password">Lösenord:</label>
    <input type="password" id="password" name="password">
    <input type="submit" id="login" value="Logga in">
</form>

<?PHP
include('includes/footer.php');
?>