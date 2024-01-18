const apiKey = 'ae89d8d4072d60d2c5397ecd99f986cb';
const movieApiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&api_key=${apiKey}`;
const genreApiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

// Get the genreId from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const genreId = urlParams.get('genreId');
// Fetch the genres from the API
window.onload = function() {
    // Get the genreId from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const genreId = urlParams.get('genreId');
    console.log('Genre ID:', genreId); // Debug line

    // Fetch the genres from the API
    fetch(genreApiUrl)
        .then(response => response.json())
        .then(data => {
            // Map the genres to an object for easy access
            const genres = data.genres.reduce((obj, genre) => {
                obj[genre.id] = genre.name;
                return obj;
            }, {});

            console.log('Genres:', genres); // Debug line

            // Get the genre name using the genreId
            const genreName = genres[genreId];
            console.log('Genre Name:', genreName); // Debug line

            // Select the element with the section-heading class
            const heading = document.getElementById('category-name');
            console.log('Heading:', heading); // Debug line

            // Replace the text of the heading with the genreName
            heading.textContent = ` ${genreName}`;

            // Fetch the movies of the genre
            fetchMovies(genreId);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function createMovieCard(movie) {
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


        const year = document.createElement('span');
        year.classList.add('year');
        year.textContent = 'Year: ' + (movie.release_date ? movie.release_date.slice(0, 4) : 'N/A');

        // Append info elements
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

function fetchMovies(genreId) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            const movies = data.results;
            const movieContainer = document.getElementById('movies-grid'); // Replace 'movie-container' with the id of your container
            movies.forEach(movie => {
                const card = createMovieCard(movie);
                movieContainer.appendChild(card);
                console.log('Appended movie card to container:', card);
            });
            return movies;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

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