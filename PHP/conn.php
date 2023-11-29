<?php
$conn = new mysqli('localhost', 'root', '', 'myshows');

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
?>