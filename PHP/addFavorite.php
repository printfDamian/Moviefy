<?php 
    session_start();
    include 'conn.php';

    // Check if the user is logged in
    if(isset($_SESSION['user_id'])){
        // Get user ID from the session
        $user_id = $_SESSION['user_id'];
        
        // Get movie ID from the query parameters
        $movie_id = $_GET['movieId'];
        
        // Prepare the SQL query to insert into the favoriteMovies table
        $insertQuery = "INSERT INTO favoriteMovies (user_id, movie_id) VALUES ($user_id, $movie_id)";

        // Execute the query
        if ($conn->query($insertQuery) === TRUE) {
            echo json_encode(['success' => true]);
            $_SESSION["favInfo"] = true;
        } else {
            echo json_encode(['error' => $conn->error]);
            $_SESSION["favInfo"] = false;
        }

        // Close the database connection
        $conn->close();
    }else{
        header('Location: ../index.php');
        exit();
    }
?>
