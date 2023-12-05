<?php
// Lists.php

// Include the database connection and other necessary files
include 'PHP/conn.php'; // Adjust the path based on your directory structure

// Start the session
session_start();

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    // Redirect or handle unauthorized access
    header('Location: login.php'); // Redirect to the login page or another appropriate action
    exit();
}

// Include the HTML header and other common elements
// Adjust the path based on your directory structure
?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Movies Website</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image/png" sizes="32x32" href="img/" />
</head>

<body>
    <nav class="navbar navbar-dark bg-dark justify-content-between">
        <a class="navbar-brand" href="homePage.php">Moviefy</a>
        <form class="form-inline" id="search-form">
            <a href="homePage.php" type="button" class="btn btn-outline-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"></path>
                </svg>
                Home Page
            </a>
        </form>

        <a class="btn btn-outline-danger" href="index.php">Logout</a>

    </nav>
    <!-- Your existing HTML structure -->
    <div id="favorite-movies-container" class="container mt-4">
    
        <h2 class="text-center">Your Favorite Movies</h2>
        <div class="row">

            <!-- PHP code to fetch and display favorite movies -->
            <?php
            // Get the user ID from the session
            $userId = $_SESSION['user_id'];

            // Query to get favorite movie IDs for the user
            $query = "SELECT movie_id FROM favoritemovies WHERE user_id = $userId";

            // Execute the query
            $result = $conn->query($query);

            // Check if the query was successful
            if ($result) {
                   
                // Fetch the results
                $favoriteMovieIds = $result->fetch_all(MYSQLI_ASSOC);

                // Loop through the favorite movie IDs and display them
                foreach ($favoriteMovieIds as $movieId) {
                    // Construct the API URL
                    $apiUrl = "https://api.themoviedb.org/3/movie/{$movieId['movie_id']}?api_key=ae89d8d4072d60d2c5397ecd99f986cb";

                    // Fetch details for the favorite movie
                    // Fetch details for the favorite movie
                    $movieDetails = json_decode(file_get_contents($apiUrl), true);

                    // Check if the API request was successful
                    if ($movieDetails && isset($movieDetails['poster_path'])) {
                        // Prepend the base URL for the images
                        $baseUrl = "https://image.tmdb.org/t/p/w500"; // Adjust the size as needed
                        $imageUrl = $baseUrl . $movieDetails['poster_path'];

                        // Display the movie details as needed
                        echo '<div class="col-md-4 mb-4">';
                        echo '<div class="card">';
                        echo '<img src="', $imageUrl, '" class="card-img-top img-fluid" alt="', $movieDetails['title'], '">';
                        echo '<div class="card-body">';
                        echo '<h5 class="card-title">', $movieDetails['title'], '</h5>';
                        // You can display other movie details as needed
                        echo '</div>';
                        echo '</div>';
                        echo '</div>';
                    } else {
                        // Handle the case when the API request fails or no poster_path is available
                        echo 'Error fetching movie details';
                    }
                }
            } else {
                // Handle the case when the query fails
                echo "Error: " . $conn->error;
            }
            ?>
        </div>
    </div>
    
    <div class="footer bg-dark text-white text-center p-3">
        <p>&copy; 2023 Movies by <a href="https://www.linkedin.com/in/afonso-bergano-96aa41254/">Afonso Bergano</a> & <a href="https://www.linkedin.com/in/samuel-santos-9708b7274/">Samuel Santos</a></p>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>

</html>