const movieApiURL = 'https://api.themoviedb.org/3/trending/movie/day?api_key=ae89d8d4072d60d2c5397ecd99f986cb&page=1&include_adult=false';
const tvApiURL = 'https://api.themoviedb.org/3/trending/tv/day?api_key=ae89d8d4072d60d2c5397ecd99f986cb&page=1&include_adult=false';
const genreApiURL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=ae89d8d4072d60d2c5397ecd99f986cb&page=1';
const searchApiURL = 'https://api.themoviedb.org/3/search/multi?api_key=ae89d8d4072d60d2c5397ecd99f986cb&page=1&query=';
const topRatedMovies = 'https://api.themoviedb.org/3/movie/top_rated?include_adult=false&api_key=ae89d8d4072d60d2c5397ecd99f986cb';
const topRatedTV = 'https://api.themoviedb.org/3/tv/top_rated?include_adult=false&api_key=ae89d8d4072d60d2c5397ecd99f986cb';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const movieContainer = document.getElementById('movie-container');
const tvContainer = document.getElementById('tv-container');
const topMovies = document.getElementById('top-movies');
const topShows = document.getElementById('top-shows');
const searchContainer = document.getElementById('search-container');
const searchForm = document.getElementById('search-form');
const resetButton = document.getElementById('reset_button');
const genreContainer = document.getElementById('genre-container');
let genresMap = {};

// Fetch genre data
fetch(genreApiURL)
    .then(response => response.json())
    .then(data => {
        // Map genre IDs to genre names
        genresMap = data.genres.reduce((map, genre) => {
            map[genre.id] = genre.name;
            return map;
        }, {});

        // Show the genre buttons
        showGenres();
        
        // Initial load of trending movies and TV shows
        showMedia(movieApiURL, movieContainer);
        showMedia(tvApiURL, tvContainer);
        showMedia(topRatedMovies,topMovies);
        showMedia(topRatedTV,topShows);
        
    })
    .catch(error => console.error('Error fetching genre data:', error));

function showGenres() {
    const genreContainer = document.getElementById('genre-container');
    
    // Create genre buttons
    for (const genreId in genresMap) {
        const genreButton = document.createElement('button');
        genreButton.classList.add('btn', 'btn-outline-success', 'mr-2', 'mb-2'); // Added 'mb-2' for bottom margin
        genreButton.textContent = genresMap[genreId];
            
        // Add click event listener to filter by genre
        genreButton.addEventListener('click', function () {
            showMediaByGenre(genreId);
        });
    
        genreContainer.appendChild(genreButton);
    }
}

function showMediaByGenre(genreId) {
    // Construct URL with genre filter
    const genreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=ae89d8d4072d60d2c5397ecd99f986cb&with_genres=${genreId}&page=1`;
    
    // Show movies based on the selected genre in the search container
    showMedia(genreUrl, searchContainer);
}

function showMedia(url, container) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(function (data) {
            console.log('Data from API:', data.results);
            container.innerHTML = ''; // Clear the container before adding new results
            data.results.forEach(element => {
                const card = createMediaCard(element);
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function createMediaCard(media) {
    console.log('Creating card for:', media.title || media.name);
    const card = document.createElement('div');
    card.classList.add('card', 'media-card');

    card.style.width = '15rem';
    card.style.height = 'auto';
    card.style.marginRight = '15px';
    card.style.border = '1px solid #ddd';
    card.style.borderRadius = '8px';
    card.style.overflow = 'hidden';
    card.style.flexShrink = '0';

    const image = document.createElement('img');
    image.src = IMGPATH + (media.poster_path || media.backdrop_path);
    image.alt = media.title || media.name;
    image.classList.add('card-img-top', 'media-poster');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = media.title || media.name;

    const rating = document.createElement('p');
    rating.classList.add('card-text');
    rating.textContent = `Rating: ${Number(media.vote_average).toFixed(1)}`;

    const releaseYear = document.createElement('p');
    releaseYear.classList.add('card-text');
    releaseYear.textContent = `Released Year: ${getReleaseYear(media)}`;

    const genres = document.createElement('p');
    genres.classList.add('card-text');
    genres.textContent = `Genres: ${getGenres(media)}`;

    const detailsButton = document.createElement('button');
    detailsButton.classList.add('btn', 'btn-outline-primary');
    detailsButton.textContent = 'Details';

    // Add event listener to the details button
    detailsButton.addEventListener('click', function () {
        // Call function to show movie details modal
        showMovieDetailsModal(media);
    });

    const addToFavoritesButton = document.createElement('button');
    addToFavoritesButton.classList.add('btn', 'btn-outline-warning', 'mr-2');
    addToFavoritesButton.textContent = '⭐';

    // Add event listener to the "Add to Favorites" button
    addToFavoritesButton.addEventListener('click', function () {
        addToFavorites(media.id); // Pass the movie ID to the addToFavorites function
    });

    cardBody.appendChild(title);
    cardBody.appendChild(rating);
    cardBody.appendChild(releaseYear);
    cardBody.appendChild(genres);
    cardBody.appendChild(detailsButton);
    cardBody.appendChild(addToFavoritesButton);

    card.appendChild(image);
    card.appendChild(cardBody);

    return card;
}

function getReleaseYear(media) {
    if (media.release_date) {
        // For movies
        return new Date(media.release_date).getFullYear();
    } else if (media.first_air_date) {
        // For TV shows
        return new Date(media.first_air_date).getFullYear();
    } else {
        return 'N/A';
    }
}

function getGenres(media) {
    if (media.genre_ids && media.genre_ids.length > 0) {
        // Map genre IDs to genre names and join them
        return media.genre_ids.map(id => genresMap[id]).join(', ');
    } else {
        return 'N/A';
    }
}

function showMovieDetailsModal(media) {
    // Get the modal element
    const modal = document.getElementById('movieDetailsModal');

    // Populate modal content with movie details
    const modalTitle = modal.querySelector('.modal-title');
    modalTitle.textContent = media.title || media.name;

    const modalBody = modal.querySelector('.modal-body');
modalBody.innerHTML = `
    <div class="row">
        <div class="col-md-6">
            <img src="${IMGPATH + (media.poster_path || media.backdrop_path)}" alt="${media.title || media.name}" class="img-fluid">
        </div>
        <div class="col-md-6">
            <p>Rating: ${Number(media.vote_average).toFixed(1)}</p>
            <p>Released Year: ${getReleaseYear(media)}</p>
            <p>Genres: ${getGenres(media)}</p>
            <p>Overview: ${media.overview || 'N/A'}</p>
            <!-- Add more details as needed -->
        </div>
    </div>
`;

// Show the modal
$(modal).modal('show');

}

// Search form event listener
searchForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission behavior
    const searchTerm = document.getElementById('search').value.trim();

    if (searchTerm !== '') {
        const searchUrl = searchApiURL + searchTerm;
        showMedia(searchUrl, searchContainer);
    } else {
        // If search box is empty, show default trending movies and TV shows
        showMedia(movieApiURL, movieContainer);
        showMedia(tvApiURL, tvContainer);
    }
});

// Reset button event listener
resetButton.addEventListener('click', function () {
    // Clear the search results when the reset button is clicked
    searchContainer.innerHTML = '';
    // Show default trending movies and TV shows
    showMedia(movieApiURL, movieContainer);
    showMedia(tvApiURL, tvContainer);
});

// Initial load of trending movies and TV shows

function addToFavorites(movieId) {
    // Construct the absolute URL for the PHP script
    const addToFavoritesURL = `/myshows/PHP/addFavorite.php?movieId=${movieId}`;

    fetch(addToFavoritesURL, {
        method: 'GET', // or 'POST' if your server expects POST requests
        credentials: 'same-origin', // include cookies if any
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Movie added to favorites:', data);
            // You can provide feedback to the user here if needed
        })
        .catch(error => console.error('Error adding movie to favorites:', error));
}








