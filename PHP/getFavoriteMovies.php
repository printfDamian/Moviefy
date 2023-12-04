<?php
// getFavoriteMovies.php
include 'conn.php';
// Assuming you have a database connection established
session_start();

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    // Handle unauthorized access
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized access']);
    exit();
}
// Get the user ID from the session
$userId = $_SESSION['user_id'];

// Query to get favorite movie IDs for the user
$query = "SELECT movie_id FROM favoritemovies WHERE user_id = ?";

// Use prepared statement to prevent SQL injection
$statement = $pdo->prepare($query);
$statement->execute([$userId]);

// Fetch the results
$favoriteMovieIds = $statement->fetchAll(PDO::FETCH_COLUMN);

// Return the result as JSON
echo json_encode(['success' => true, 'favoriteMovieIds' => $favoriteMovieIds]);
?>
