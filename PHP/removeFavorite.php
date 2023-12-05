<?php
session_start();
include 'conn.php';

// Check if the user is logged in
if (isset($_SESSION['user_id'])) {
    // Get user ID from the session
    $user_id = $_SESSION['user_id'];

    // Get movie ID from the query parameters
    $movie_id = $_GET['movieId'];

    // Prepare the SQL query to remove the movie from favoriteMovies table
    $deleteQuery = "DELETE FROM favoriteMovies WHERE user_id = $user_id AND movie_id = $movie_id";

    // Execute the query
    if ($conn->query($deleteQuery) === TRUE) {
        echo json_encode(['success' => true]);
        $_SESSION["removeFavInfo"] = true;
    } else {
        echo json_encode(['error' => $conn->error]);
        $_SESSION["removeFavInfo"] = false;
    }

    // Close the database connection
    $conn->close();
} else {
    header('Location: ../index.php');
    exit();
}
?>
