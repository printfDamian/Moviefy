// Define API key and URLs
const apiKey = 'ae89d8d4072d60d2c5397ecd99f986cb';
const movieApiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&api_key=${apiKey}`;
const genreApiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
let genresMap = {};

// Function to fetch movie data from the API
async function fetchMovies() {
    try {
        const response = await fetch(movieApiUrl);
        const data = await response.json();
        return data.results; // Assuming the results array contains movie data
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

// Function to create a movie card element
function createMovieCard(movie, genreMap) {
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
        rating.innerHTML = `<ion-icon name="star-outline"></ion-icon><span>${movie.vote_average}</span>`;

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
        const genreName = genreId ? (genreMap[genreId] ? genreMap[genreId].name : 'Genre not available') : 'Genre not available';

        const genreSpan = document.createElement('span');
        genreSpan.classList.add('genre');
        genreSpan.textContent = genreName;

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

    return card;
}

// Function to show genre buttons
function showGenres(genres) {
    // Implement your logic to show genre buttons
}

// Updated updateMovieCards function
async function updateMovieCards() {
    try {
        const movies = await fetchMovies();
        await fetchGenres(); // No need to assign to genreMap here since it's already assigned in fetchGenres

        const movieContainer = document.getElementById('movie-container');

        // Clear previous content
        movieContainer.innerHTML = '';

        // Assuming 3 cards per row, you can adjust this based on your design
        const cardsPerRow = 7;

        // Calculate the width for each column in the grid
        const columnWidth = `${700 / cardsPerRow}%`;

        // Set the grid-template-columns property
        movieContainer.style.gridTemplateColumns = `repeat(${cardsPerRow}, ${columnWidth})`;

        movies.forEach((movie) => {
            const card = createMovieCard(movie, genresMap);
            movieContainer.appendChild(card);
        });

        movieContainer.classList.add('movies-grid');
        showGenres(Object.values(genresMap)); // Show genre buttons
    } catch (error) {
        console.error('Error updating movie cards:', error);
    }
}

// Call the updateMovieCards function to fetch and update movie data
updateMovieCards();
