'use strict';

// variables for navbar menu toggle
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const navbarMenuBtn = document.querySelector('.navbar-menu-btn');

// variables for navbar search toggle
const navbarForm = document.querySelector('.navbar-form');
const navbarFormCloseBtn = document.querySelector('.navbar-form-close');
const navbarSearchBtn = document.querySelector('.navbar-search-btn');

// variables for menu toggle function
function navIsActive() {
    header.classList.toggle('active');
    nav.classList.toggle('active');
    navbarMenuBtn.classList.toggle('active');
} 

navbarMenuBtn.addEventListener('click', navIsActive);

// navbar search toggle function
const searchBarIsActive = () => navbarForm.classList.toggle('active');

navbarSearchBtn.addEventListener('click', searchBarIsActive);
navbarFormCloseBtn.addEventListener('click', searchBarIsActive);

// end of that stuff
// Define API key and URLs


const apiKey = 'ae89d8d4072d60d2c5397ecd99f986cb';
const movieApiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&api_key=${apiKey}`;
const genreApiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
let genresMap = {};




// Usage example for trending movies
const trendingMoviesURL = `https://api.themoviedb.org/3/trending/movie/day?api_key=ae89d8d4072d60d2c5397ecd99f986cb&page=1&include_adult=false`;

// Function to fetch movie data from the API
async function fetchMovieDetails(movieId) {
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    try {
        const response = await fetch(movieDetailsUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
}

// Updated fetchMovies function
async function fetchMovies(url, genre, year) {
    console.log(year);
    try {
        let finalUrl = url;
        if (genre !== 'all genres') {
            finalUrl += `&with_genres=${genre}`;
        }
        if (year !== 'all years') {
            if (year.includes('-')) {
                const [earlierYear, laterYear] = year.split('-');
                finalUrl += `&primary_release_date.gte=${earlierYear}&primary_release_date.lte=${laterYear}`;
            } else if (year === '1999 and before') {
                finalUrl += '&primary_release_date.lte=1999';
            } else {
                finalUrl += `&primary_release_year=${year}`;
            }
        }
        const response = await fetch(finalUrl);
        const data = await response.json();

        let movies;
        if (Array.isArray(data.results)) {
            movies = data.results;
        } else {
            if (url.includes('/movie/latest')) {
                const currentDate = new Date().toISOString().split('T')[0];
                const discoverUrl = `https://api.themoviedb.org/3/discover/movie?primary_release_date.lte=${currentDate}&api_key=${apiKey}`;
                const discoverResponse = await fetch(discoverUrl);
                const discoverData = await discoverResponse.json();
                movies = discoverData.results;
            } else {
                movies = [data];
            }
        }

        const detailedMovies = await Promise.all(
            movies.map(async (movie) => {
                const detailedInfo = await fetchMovieDetails(movie.id);
                return { ...movie, ...detailedInfo };
            })
        );

        return detailedMovies;
    } catch (error) {
        console.error('Error fetching movie data:', error);
        throw error;
    }
}
// Function to fetch genre data from the API
async function fetchGenres() {
    try {
        const response = await fetch(genreApiUrl);
        const data = await response.json();
        genresMap = data.genres.reduce((map, genre) => {
            map[genre.id] = genre;
            return map;
        }, {});
        return genresMap;
    } catch (error) {
        console.error('Error fetching genre data:', error);
        throw error;
    }
}

async function fetchTrendingMovies() {
    const trendingMoviesUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=1&include_adult=false`;
    try {
        const response = await fetch(trendingMoviesUrl);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
}

// Function to create a movie card element
function createMovieCard(movie, genreMap) {
    console.log(`Creating movie card for movie: ${movie.title}`);
    const card = document.createElement('div');
    card.classList.add('movie-card');

    try {
        // Create card head
        const cardHead = document.createElement('div');
        cardHead.classList.add('card-head');

        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        img.alt = '';
        img.classList.add('card-img');

        // Create card overlay
        const cardOverlay = document.createElement('div');
        cardOverlay.classList.add('card-overlay');

        // (bookmark, rating, play)
        const bookmark = document.createElement('div');
        bookmark.classList.add('bookmark');
        bookmark.innerHTML = '<ion-icon name="bookmark-outline"></ion-icon>';

        const rating = document.createElement('div');
        rating.classList.add('rating');
        rating.innerHTML = `<ion-icon name="star-outline"></ion-icon><span>${Number(movie.vote_average).toFixed(1)}</span>`; // Round to one decimal place

        const play = document.createElement('div');
        play.classList.add('play');
        play.innerHTML = '<ion-icon name="play-circle-outline"></ion-icon>';

        // Append overlay elements
        cardOverlay.appendChild(bookmark);
        cardOverlay.appendChild(rating);
        cardOverlay.appendChild(play);

        // Append head elements
        cardHead.appendChild(img);
        cardHead.appendChild(cardOverlay);

        // Create card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h3');
        title.classList.add('card-title');
        title.textContent = movie.title;

        // Create card info
        const cardInfo = document.createElement('div');
        cardInfo.classList.add('card-info');

        // Check if genre information is available in the API response
        const genreId = movie.genre_ids ? movie.genre_ids[0] : null;
        const genreName = genreId
            ? genreMap[genreId] 
                ? genreMap[genreId].name
                : 'Genre not available'
            : 'Genre not available';

        const genreSpan = document.createElement('span');
        genreSpan.classList.add('genre');
        genreSpan.textContent = "Genre: "+genreName;

        const year = document.createElement('span');
        year.classList.add('year');
        year.textContent = 'Year: ' + (movie.release_date ? movie.release_date.slice(0, 4) : 'N/A');

        // Append info elements
        cardInfo.appendChild(genreSpan);
        cardInfo.appendChild(year);

        // Append body elements
        cardBody.appendChild(title);
        cardBody.appendChild(cardInfo);

        // Append card elements
        card.appendChild(cardHead);
        card.appendChild(cardBody);
    } catch (error) {
        console.error('Error creating movie card:', error);
    }
    card.addEventListener('click', () => {
        window.location.href = `movieDetails.html?id=${movie.id}`;
    });
    return card;
}

async function updateBanner() {
    try {
        const trendingMovies = await fetchTrendingMovies();
        const randomIndex = Math.floor(Math.random() * trendingMovies.length);
        const randomMovie = trendingMovies[randomIndex];
        const bannerCard = document.getElementById('banner-card');

        // Create anchor tag
        const anchor = document.createElement('a');
        anchor.href = `movieDetails.html?id=${randomMovie.id}`; // Set the href to the movie details page

        // Create elements similar to createMovieCard function
        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w1280${randomMovie.backdrop_path}`;
        img.alt = '';
        img.classList.add('banner-img');

        // Add fade-in animation
        img.style.opacity = '0';
        setTimeout(() => {
            img.style.opacity = '1';
        }, 50);

        // Clear previous content and append the new image
        bannerCard.innerHTML = '';
        anchor.appendChild(img); // Append the image to the anchor tag instead of the bannerCard

        // Create other elements (genre, year, duration, quality, title)
        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        const cardInfo = document.createElement('div');
        cardInfo.classList.add('card-info');

        // Genre
        const genre = document.createElement('div');
        genre.classList.add('genre','text-shadow');
        genre.innerHTML = `<ion-icon name="film"></ion-icon><span>${getGenres(randomMovie)}</span>`;
        cardInfo.appendChild(genre);

        // Release Year
        const year = document.createElement('div');
        year.classList.add('year','text-shadow');
        year.innerHTML = `<ion-icon name="calendar"></ion-icon><span>${getReleaseYear(randomMovie)}</span>`;
        cardInfo.appendChild(year);

        // Title
        const title = document.createElement('h2');
        title.classList.add('card-title','text-shadow');
        title.textContent = randomMovie.title || randomMovie.name;
        cardContent.appendChild(cardInfo);
        cardContent.appendChild(title);

        // Append card content to anchor tag
        anchor.appendChild(cardContent);

        // Append anchor tag to banner card
        bannerCard.appendChild(anchor);
    } catch (error) {
        console.error('Error updating banner:', error);
    }
}

// Function to get release year
function getReleaseYear(movie) {
    if (movie.release_date) {
        return new Date(movie.release_date).getFullYear();
    } else {
        return 'N/A';
    }
}

// Function to get genres
function getGenres(movie) {
    if (movie.genre_ids && movie.genre_ids.length > 0) {
        return movie.genre_ids.map((id) => genresMap[id].name).join(', ');
    } else {
        return 'N/A';
    }
}
/// Select the input field
var inputField = document.getElementById("movie-search");

// Add an event listener for the input field change
inputField.addEventListener("input", function() {
    // Get the user's input from the input field
    var movieSearch = inputField.value;

    // Select the <h1> tag
    var h1Tag = document.getElementById("searched-movie");

    // If the user has entered something, display the <h1> tag
    if (movieSearch) {
        h1Tag.textContent = "Searched movie: " + movieSearch;
        h1Tag.style.display = "block"; // Show the <h1> tag
    } else {
        h1Tag.style.display = "none"; // Hide the <h1> tag
    }
});
// Updated updateMovieCards function
async function updateMovieCards(url = movieApiUrl, genreId = '', year = '') {
    console.log('Year in updateMovieCards:', year);
    try {
        let movies;
        if (year.includes('-')) {
            // Split the year range into start and end years
            const [startYear, endYear] = year.split('-');

            // Fetch the movies
            const response = await fetch(`${url}&with_genres=${genreId}`);
            const data = await response.json();

            // Filter the movies based on the year range
            movies = data.results.filter(movie => {
                const releaseYear = new Date(movie.release_date).getFullYear();
                return releaseYear >= startYear && releaseYear <= endYear;
            });
        } else {
            // If year doesn't include '-', it's a single year
            movies = await fetchMovies(url, genreId, year);
        }

        console.log('Movies:', movies); // Log the movies

        const movieSection = document.getElementById('movie-container');
        movieSection.innerHTML = '';

        const cardsPerRow = 7;
        const columnWidth = `${700 / cardsPerRow}%`;
        movieSection.style.gridTemplateColumns = `repeat(${cardsPerRow}, ${columnWidth})`;

        console.log('Genres map:', genresMap); // Log the genres map
        movies.forEach((movie) => {
            const card = createMovieCard(movie, genresMap);
            console.log('Card:', card); // Log the card
            movieSection.appendChild(card);
        });

        movieSection.classList.add('movies-grid');
    } catch (error) {
        console.error('Error updating movie cards:', error);
    }
}
window.onload = function() {
    const featured = document.getElementById('featured');
    const popular = document.getElementById('popular');
    const newest = document.getElementById('newest');
    const genreSelect = document.getElementById('genreSelect');
    const yearSelect = document.querySelector('.year');

    featured.addEventListener('change', async () => {
        await updateMovieCards(`https://api.themoviedb.org/3/movie/top_rated?include_adult=false&api_key=${apiKey}`, '', yearSelect.value);
    });
    
    popular.addEventListener('change', async () => {
        await updateMovieCards(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`, '', yearSelect.value);
    });
    
    newest.addEventListener('change', async () => {
        await updateMovieCards(`https://api.themoviedb.org/3/movie/latest?api_key=${apiKey}`, '', yearSelect.value);
    });

    genreSelect.addEventListener('change', async function() {
        const genreId = this.value;
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
        
        try {
            await updateMovieCards(url, genreId, yearSelect.value);
        } catch (error) {
            console.error('Error updating movie cards:', error);
        }
    });
    
    yearSelect.addEventListener('change', async function() {
        const year = this.value;
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
        
        try {
            await updateMovieCards(url, genreSelect.value, year);
        } catch (error) {
            console.error('Error updating movie cards:', error);
        }
    });

// Select all the category-card elements
const categories = document.querySelectorAll('.category-card');

// Add a click event listener to each category-card
categories.forEach(category => {
    category.addEventListener('click', function() {
        // Get the genre ID from the category-card element
        const genreId = category.dataset.genreId;

        // Redirect to the category.html page with the genre ID as a URL parameter
        window.location.href = `category.html?genreId=${genreId}`;
    });
});
    
}
function createSearchResultCard(movie, genreMap) {
    const card = createMovieCard(movie, genreMap);
    card.classList.add('search-result-card');
    return card;
}
function clearSearchResults() {
    const searchResultsContainer = document.getElementById('search-results-container');
    searchResultsContainer.innerHTML = ''; // Clear the contents of the container
    searchResultsContainer.classList.remove('search-results'); // Remove the search-results class
}
// Function to update the search results
async function updateSearchResults(query) {
    try {
        // Fetch movies based on the search query
        const searchApiUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`;
        const response = await fetch(searchApiUrl);
        const data = await response.json();
        const searchResults = data.results;

        const searchResultsContainer = document.getElementById('search-results-container');

        // Clear previous content
        clearSearchResults();

        // Create and append search result cards
        searchResults.forEach((movie) => {
            const card = createSearchResultCard(movie, genresMap);
            searchResultsContainer.appendChild(card);
        });

        searchResultsContainer.classList.add('search-results');
    } catch (error) {
        console.error('Error updating search results:', error);
    }
}

// Function to handle search form submission
function handleSearchForm(event) {
    event.preventDefault();
    const searchInput = document.querySelector('.navbar-form-search');
    const query = searchInput.value.trim();

    if (query) {
        updateSearchResults(query);
    } else {
        // If the search query is empty, clear the search results
        clearSearchResults();
    }
}


// Function to handle search form submission
// Function to handle search form submission
function handleSearchForm(event) {
    event.preventDefault();
    const searchInput = document.querySelector('.navbar-form-search');
    const query = searchInput.value.trim();

    if (query) {
        updateSearchResults(query);
    } else {
        // If the search query is empty, clear the search results
        clearSearchResults();
    }
}


// Add event listener for search form submission
const searchForm = document.querySelector('.navbar-form');
searchForm.addEventListener('submit', handleSearchForm);

// Call the updateMovieCards function to fetch and update movie data
(async () => {
    // Call fetchGenres before other functions
    await fetchGenres();

    // Call other functions
    updateBanner();
    setInterval(updateBanner, 10000);
    updateMovieCards();
})();