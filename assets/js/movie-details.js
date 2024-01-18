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
