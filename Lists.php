<?php
// Lists.php

// Include the database connection and other necessary files
include 'PHP/conn.php';

// Start the session
session_start();

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    // Redirect or handle unauthorized access
    header('Location: ../index.php'); // Redirect to the login page or another appropriate action
    exit();
}

// Include the HTML header and other common elements
include 'PHP/header.php';

?>

<!-- Your existing HTML and CSS code for the page -->

<!-- Container to display favorite movies -->
<div id="favorite-movies-container" class="container mt-4">
    <!-- Favorite movies will be dynamically added here -->
</div>

<script>
// ... (Your existing JavaScript code)

// Function to show favorite movies
function showFavoriteMovies() {
    // Fetch the list of favorite movie IDs from your server
    fetch('PHP/getFavoriteMovies.php') // Replace with the actual path
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Loop through the favorite movie IDs and fetch details for each
                data.favoriteMovieIds.forEach(movieId => {
                    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=ae89d8d4072d60d2c5397ecd99f986cb`;

                    // Fetch details for the favorite movie
                    fetch(apiUrl)
                        .then(response => response.json())
                        .then(movieDetails => {
                            // Create a card or display the details as needed
                            const card = createMediaCard(movieDetails);
                            // Append the card to the container where you want to display favorite movies
                            document.getElementById('favorite-movies-container').appendChild(card);
                        })
                        .catch(error => console.error('Error fetching movie details:', error));
                });
            } else {
                console.error('Error fetching favorite movies:', data.error);
            }
        })
        .catch(error => console.error('Error fetching favorite movies:', error));
}

// Call the function to display favorite movies
showFavoriteMovies();

// ... (Your existing JavaScript code)
</script>

<div class="footer bg-dark text-white text-center p-3">
        <p>&copy; 2023 Movies by <a href="https://www.linkedin.com/in/afonso-bergano-96aa41254/">Afonso Bergano</a> & <a href="https://www.linkedin.com/in/samuel-santos-9708b7274/">Samuel Santos</a></p>
</div>
</body>
</html>
