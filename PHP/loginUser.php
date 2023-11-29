<?php
include 'conn.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    $sql = "SELECT id FROM users WHERE email = '$email' AND password = '$password'";
    
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $user_id = $row['id'];

        $_SESSION['user_id'] = $user_id;
        header("Location: ../homePage.html");
        exit();
    } else {
        $_SESSION['login_failed'] = true;
       header("Location: ../index.php");
       exit();
    }
}

$conn->close();
?>
