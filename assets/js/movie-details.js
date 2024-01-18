const apiKey = 'ae89d8d4072d60d2c5397ecd99f986cb';
const movieApiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&api_key=${apiKey}`;
const genreApiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
let genresMap = {};

const movieDetails = document.querySelector('.movie-details');
const movieDetailsContainer = document.querySelector('.movie-details-container');
const movieDetailsClose = document.querySelector('.movie-details-close');
const movieDetailsTitle = document.querySelector('.movie-details-title');
const movieDetailsOverview = document.querySelector('.movie-details-overview');
const movieDetailsGenres = document.querySelector('.movie-details-genres');
const movieDetailsRating = document.querySelector('.movie-details-rating');
const movieDetailsRelease = document.querySelector('.movie-details-release');
const movieDetailsPoster = document.querySelector('.movie-details-poster');
const movieDetailsBackdrop = document.querySelector('.movie-details-backdrop');
const movieDetailsCast = document.querySelector('.movie-details-cast');
const movieDetailsCastList = document.querySelector('.movie-details-cast-list');
const movieDetailsCastClose = document.querySelector('.movie-details-cast-close');



window.onload = async function() {
    

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    
    const movieDetailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
    const movieDetails = await movieDetailsResponse.json();
    const movieVideosResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`);
    const movieVideos = await movieVideosResponse.json();

    // Find the first YouTube trailer video
    const trailer = movieVideos.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');

    // Get the YouTube video URL
    const trailerUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;

    const trailerButton = document.querySelector('.btn.btn-primary');
    const closeModal = document.getElementById('closeModal');
    const playButton = document.querySelector('.play-btn');
// Add the click event listener
trailerButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default button click behavior
    if (trailerUrl) { // Check if the trailer URL is defined
        // Check the viewport width
        if (window.innerWidth <= 600) { // 600px is a common breakpoint for mobile devices
            // If the viewport is small, redirect to YouTube
            window.location.href = trailerUrl;
        } else {
            // If the viewport is large, open the modal
            // Create the iframe
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`;
            iframe.width = '560';
            iframe.height = '315';
            iframe.allowFullscreen = true;

            // Remove any existing iframes
            while (trailerPlayer.firstChild) {
                trailerPlayer.removeChild(trailerPlayer.firstChild);
            }

            // Add the iframe to the div
            trailerPlayer.appendChild(iframe);

            // Open the modal
            trailerModal.style.display = 'block';
        }
    } else {
        console.log('No trailer URL found');
    }
});

playButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default button click behavior
    if (trailerUrl) { // Check if the trailer URL is defined
        // Check the viewport width
        if (window.innerWidth <= 600) { // 600px is a common breakpoint for mobile devices
            // If the viewport is small, redirect to YouTube
            window.location.href = trailerUrl;
        } else {
            // If the viewport is large, open the modal
            // Create the iframe
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`; // Add ?autoplay=1&mute=1 to the URL
            iframe.width = '560';
            iframe.height = '315';
            iframe.allow = 'autoplay'; // Allow autoplay
            iframe.allowFullscreen = true;

            // Remove any existing iframes
            while (trailerPlayer.firstChild) {
                trailerPlayer.removeChild(trailerPlayer.firstChild);
            }

            // Add the iframe to the div
            trailerPlayer.appendChild(iframe);

            // Open the modal
            trailerModal.style.display = 'block';
        }
    } else {
        console.log('No trailer URL found');
    }
});

// Close the modal when the close button is clicked
closeModal.addEventListener('click', () => {
    trailerModal.style.display = 'none';
});

// Close the modal when the user clicks outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target == trailerModal) {
        trailerModal.style.display = 'none';
    }
});

    // Select the elements from the DOM
    const movieDetailsTitle = document.querySelector('.detail-title');
    const movieDetailsImage = document.querySelector('.movie-detail-banner img');
    const movieDetailsStoryline = document.querySelector('.storyline');
    const movieDetailsYear = document.querySelector('.date-time time');

    // Update the elements with the movie details
    movieDetailsTitle.textContent = movieDetails.title;
    movieDetailsImage.src = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
    movieDetailsStoryline.textContent = movieDetails.overview;
    movieDetailsYear.textContent = movieDetails.release_date.slice(0, 4);

    // Set the movie backdrop image as the body background
    document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`;


// ...

// ...

// Select the elements from the DOM
const movieDetailsPG = document.querySelector('.badge'); // Select the badge element for PG
const movieDetailsGenres = document.querySelector('.ganre-wrapper'); // Select the anchor tag inside the genre wrapper

// ...

// Update the genres and PG rating
if (movieDetailsGenres) { // Check that the element exists
    movieDetailsGenres.textContent = movieDetails.genres.map(genre => genre.name).join(', ');
}
if (movieDetailsPG) { // Check that the element exists
    movieDetailsPG.textContent = movieDetails.release_dates.results[0].release_dates[0].certification;
}

// ...

   
}
