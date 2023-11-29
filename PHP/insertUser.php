<?php
include 'conn.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $password = $_POST['password'];

   

    

    $checkQuery = "SELECT id FROM users WHERE email = '$email'";
    $checkResult = $conn->query($checkQuery);

    if ($checkResult->num_rows > 0) {
       
        $_SESSION["email_registered"] = true;
        header("Location: ../index.php");
        exit();
    } else {
        // Email is not registered, proceed with insertion
        $sql = "INSERT INTO users (name,email, password) VALUES ('$name','$email','$password')";

        if ($conn->query($sql) === true) {
            $user_id = $conn->insert_id;

            $_SESSION["user_id"] = $user_id;

            // Redirect or do further processing
            header("Location: ../homePage.html");
            exit();
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}

$conn->close();
?>
