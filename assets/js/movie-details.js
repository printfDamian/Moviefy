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
    // Get the movie ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    // Fetch the movie details
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
    const movieDetails = await response.json();

    // Fetch the movie's videos
    const videosResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`);
    const movieVideos = await videosResponse.json();

    // Find the first trailer in the videos list
    const trailer = movieVideos.results.find(video => video.type === 'Trailer');

    // Insert the movie details into the page
    movieDetailsTitle.textContent = movieDetails.title;
    movieDetailsOverview.textContent = movieDetails.overview;
    movieDetailsRating.textContent = `Rating: ${movieDetails.vote_average}`;
    movieDetailsRelease.textContent = `Release date: ${movieDetails.release_date}`;

    // If a trailer is available, create an iframe and append it to the movieDetailsContainer
    if (trailer) {
        const trailerIframe = document.createElement('iframe');
        trailerIframe.src = `https://www.youtube.com/embed/${trailer.key}`;
        trailerIframe.frameborder = "0";
        trailerIframe.allowfullscreen = true;
        movieDetailsContainer.appendChild(trailerIframe);
    }

    // Fetch and display the movie's genres
    const genresResponse = await fetch(genreApiUrl);
    const genresData = await genresResponse.json();
    genresMap = genresData.genres.reduce((map, genre) => {
        map[genre.id] = genre.name;
        return map;
    }, {});
    movieDetailsGenres.textContent = movieDetails.genres.map(genre => genresMap[genre.id]).join(', ');

    // Fetch and display the movie's cast
    const castResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`);
    const castData = await castResponse.json();
    movieDetailsCastList.innerHTML = castData.cast.map(actor => `<li>${actor.name} as ${actor.character}</li>`).join('');
}
