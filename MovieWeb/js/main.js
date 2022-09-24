//API URLS
const API_KEY = 'api_key=d557238bc4d2131bab0b4885056046d5';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&page=1&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

//vars
let watchList = [];

//GANRES =>  Action=28. Horror=27. Comedy=10752. Animation=16; 
getMovies(API_URL + '&with_genres=28', 28);
getMovies(API_URL + '&with_genres=27', 27);
getMovies(API_URL + '&with_genres=10752', 10752);
getMovies(API_URL + '&with_genres=16', 16);

//FUNCTIONS
function getMovies(url, id) {
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results, id);
    })
};

//to show all movies on PAGE
function showMovies(data, ind) {

    data.forEach((movie, index) => {

        const { title, poster_path, vote_average, overview, release_date, genre_ids, original_language, id, genres } = movie;
        let date = release_date.split('-');
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-card');
        movieElement.innerHTML =
            ` 
            <div class="card-head">
                <img src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580"}" alt="${title}">
                <div class="movie-overlay">
                    <span><i class="fa-solid fa-bookmark"></i></span>
                    <span><i class="fa-solid fa-star" style="color: gold;"></i>${vote_average}</span>
                </div>
            </div>
            <div class="movie-info">
                 <div class="movie-name">
                     ${title}
                 </div>
                     <div class="movie-genre">
                       <p>Action</p>
                       <p>${date[0]}</p>
                       <p style = "display: none;" id="movie-id">${id}</p>
                    </div>
            </div>
         `
        if (index < 7) {
            if (ind === 28) {
                document.querySelector('.action .movies-grid').appendChild(movieElement);
            } else if (ind === 27) {
                document.querySelector('.horror .movies-grid').appendChild(movieElement);
            } else if (ind === 10752) {
                document.querySelector('.war .movies-grid').appendChild(movieElement);
            }
        }
        if (ind === 16) {
            document.querySelector('.animation .slider-track').appendChild(movieElement);
        }
    });
}

//Get id of movie and call function ();
setTimeout(() => {
    document.querySelectorAll('.movie-card').forEach((card, inx) => {
        card.addEventListener('click', () => {
            document.querySelector('.movies-detail').remove();

            let movieID = document.querySelectorAll('#movie-id');
            getMovieDetails(BASE_URL + `/movie/${movieID[inx].innerHTML}?` + API_KEY);
        })
    });
}, 1000)

// Get movies detail by ID 
function getMovieDetails(url) {
    fetch(url).then(res => res.json()).then(data => {
        showMovieDetails(data);
    })
}

// Show movies details
function showMovieDetails(data) {
    let { poster_path, spoken_languages, title, runtime, overview, genres, budget, vote_average, release_date, backdrop_path, id } = data;
    const newElement = document.createElement('div');
    newElement.classList.add('movies-detail');
    newElement.innerHTML =
        `
        <div class="movies-details-header">
            <button type="button" class="btn-close"></button>
            <img src="${backdrop_path ? IMG_URL + backdrop_path : "http://via.placeholder.com/1080x1580"}" alt="movies">
            <div>
            <h1>${title}</h1>
            <button type="button" class="btn-bookmark"><i class="fa-solid fa-bookmark"></i></button>
            </div>
        </div>
        <div class="movies-details-body">
            <p>${overview}</p>
            <ul>
                <li> <i class="fa-solid fa-language"></i> Language: <span>${spoken_languages[0].name}</span></li>
                <li> <i class="fa-solid fa-clapperboard"></i> Genres: <span>${genres[0].name},${genres[1].name}</span></li>
                <li> <i class="fa-solid fa-sack-dollar"></i> Budget: <span>${budget !== 0 ? budget : 10000}$</span></li>
                <li> <i class="fa-solid fa-star"></i> Rating: <span>${vote_average.toFixed(1)}</span></li>
                <li> <i class="fa-solid fa-calendar-days"></i> Release date: <span>${release_date}</span></li>
                <li> <i class="fa-solid fa-clock"></i> Runtime: <span>${runtime}min</span></li>

            </ul>
        </div>

        `
    // add to movie details and show 
    document.body.appendChild(newElement);
    document.querySelector('.movies-detail').classList.add('active');
    document.querySelectorAll('section').forEach(section => section.classList.add('hide'));
    document.querySelector('.banner').classList.remove('hide');
    document.querySelector('.banner').classList.add('blur');
    document.querySelector('.footer').classList.add('hide');

    // close movie details 
    let btnClose = document.querySelector('.btn-close');
    btnClose.addEventListener('click', () => {
        document.querySelector('.movies-detail').classList.remove('active');
        document.querySelector('.movies-detail').classList.add('hide');
        document.querySelector('.banner').classList.remove('blur');
        document.querySelector('.footer').classList.remove('hide');
        document.querySelectorAll('section').forEach(i => i.classList.remove('hide'));
        document.querySelector('.watchlist').classList.add('hide');
    });

    let btnWatchList = document.querySelector('.btn-bookmark');
    btnWatchList.addEventListener('click', () => {
        watchList.push(id);
    });

}

// Get watchlist movies
function getWatchlist(url) {
    fetch(url).then(res => res.json()).then(data => {
        showWatchlist(data);
    })
}

// Show watchlist movies
function showWatchlist(data) {
    let { poster_path, title, runtime, genres, vote_average, backdrop_path, id } = data;
    const newWatchlist = document.createElement('div');
    newWatchlist.classList.add('col-12');
    newWatchlist.classList.add('watch-list');
    newWatchlist.classList.add('mb-5');
    newWatchlist.innerHTML =
        `
                <div class="watchlist-img">
                    <img src="${poster_path ? IMG_URL + backdrop_path : "http://via.placeholder.com/1080x1580"}" alt="image">
                </div>
                <div class="watchlist-info">
                    <h1 class="fs-1">${title}</h1>
                    <p class="fs-6 fw-lighter"><i class="fa-solid fa-clapperboard"></i> Genre: ${genres[0].name}</p>
                    <p class="fs-6 fw-lighter"><i class="fa-solid fa-clock"></i> Runtime: ${runtime}min</p>
                    <p class="fs-6 fw-lighter"><i class="fa-solid fa-star"></i> Rating: ${vote_average.toFixed(1)}</p>
                </div>
            `
    document.querySelector('.watchlist .row').appendChild(newWatchlist);
}

// close watchList 
document.querySelector('.btn-watchlist').addEventListener('click', () => {
    setTimeout(() => {
        document.querySelectorAll('section').forEach(section => section.classList.remove('hide')), document.querySelector('header').classList.remove('hide');
        document.querySelector('.watchlist').classList.add('hide');
        document.querySelector('.search-info').classList.add('hide');
        document.querySelector('.banner').classList.remove('blur');
        document.querySelector('.footer').classList.remove('hide');
    }, 600)
});

// open watchList
document.querySelector('.watchlist-close').addEventListener('click', () => {
    setTimeout(() => {
        document.querySelectorAll('section').forEach(section => section.classList.add('hide')), document.querySelector('header').classList.add('hide');
        document.querySelector('.watchlist').classList.remove('hide');
        document.querySelector('.footer').classList.add('hide');
        document.querySelector('.movies-detail').classList.add('hide');

        if (watchList.length !== 0) {
            document.querySelectorAll('.delete-me').forEach(item => item.innerHTML = '');
            watchList.forEach(item => {
                getWatchlist(BASE_URL + `/movie/${item}?` + API_KEY);
            });
        } else {
            if (document.querySelector('.watch-list').contains(document.querySelector('.watchlist-img'))) {
            } else {
                document.querySelectorAll('.delete-me').forEach(i => i.innerHTML = '');
                let noWatchList = document.createElement('div');
                noWatchList.classList.add('row');
                noWatchList.classList.add('delete-me');
                noWatchList.innerHTML =
                    `
                    <div class="col-12 text-center mt-5 d-flex fw-lighter" style="padding-right: 80px;">
                        <h1 class="fs-1">Your WatchList is empty!</h1>
                    </div>
                `
                document.querySelector('.watchlist .container').appendChild(noWatchList);
            }
        }
        watchList = [];
    }, 600);
});

// SEARCH BUTTON
let search = document.querySelector('.search-btn');
search.addEventListener('click', () => {
    document.querySelector('.search-info .row .d-flex').innerHTML = '';
    let searchTerm = document.querySelector('.search').value;
    if (searchTerm) {
        document.querySelector('.search-info h2').innerHTML = searchTerm;

        getMovieSearch(SEARCH_URL + '&query=' + searchTerm);

        document.querySelector('.search-info').classList.remove('hide'),
            document.querySelector('.banner').classList.add('hide'),
            document.querySelector('.filter').classList.add('hide'),
            document.querySelector('.movies').classList.add('hide'),
            document.querySelector('.watchlist').classList.add('hide');
    } else {
        document.querySelector('.search-info h2').innerHTML = 'Random good movies';
        getMovieSearch(BASE_URL + '/discover/movie?sort_by=popularity.desc&page=3&' + API_KEY);
    }

});

//Get search movies
function getMovieSearch(url) {
    fetch(url).then(res => res.json()).then(data => {
        if (data.results.length !== 0) {
            showMovieSearch(data.results);
        } else {
            document.querySelector('.search-info h2').innerHTML = `Sorry, we couldn't find any results :(`;
        }
    })
}

//Show search movies
function showMovieSearch(data) {
    data.forEach((movie, index) => {
        let { poster_path, title, vote_average, backdrop_path, overview } = movie;
        const newSearchMovie = document.createElement('div');
        newSearchMovie.classList.add('col-lg-2');
        newSearchMovie.classList.add('col-sm-6');
        newSearchMovie.classList.add('search-card');
        newSearchMovie.classList.add('mb-5');
        newSearchMovie.innerHTML =
            `
            <div class="card-head">
                <img src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580"}" alt="${title}">
                <div class="movie-overlay-info">
                    <p class="text-decoration-underline fw-bold">Overview</p>
                    ${overview}
                </div>
            </div>
            <div class="movie-info">
                <div class="movie-name-rate">
                    <p>${title}</p>
                <p class="${getColor(vote_average)}">${vote_average}</p>
                </div>
            </div>
        `
        document.querySelector('.search-info .row .d-flex').appendChild(newSearchMovie);
    });
}

// get color for ratings
function getColor(vote) {
    if (vote >= 7) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

//header buttons
document.querySelector('#header-movies').addEventListener('click', () => {

    document.querySelector('.search-info').classList.add('hide'),
        document.querySelector('.banner').classList.remove('hide'),
        document.querySelector('.filter').classList.remove('hide'),
        document.querySelector('.movies').classList.remove('hide');
    // document.querySelector('.watchlist').classList.add('hide');
});

//MOVIES BUTTON
let moviesButton = document.querySelector('#movies-button');
moviesButton.addEventListener('click', () => {
    document.querySelector('.search-info .row .d-flex').innerHTML = '';

    getMovieSearch(API_URL);

    document.querySelector('.search-info').classList.remove('hide'),
        document.querySelector('.banner').classList.add('hide'),
        document.querySelector('.filter').classList.add('hide'),
        document.querySelector('.movies').classList.add('hide'),
        document.querySelector('.footer').classList.remove('hide'),
        document.querySelector('.watchlist').classList.add('hide');
});

//CARTOON BUTTON
let cartoonButton = document.querySelector('#cartoon-button');
cartoonButton.addEventListener('click', () => {
    document.querySelector('.search-info .row .d-flex').innerHTML = '';

    getMovieSearch(API_URL + '&with_genres=16');

    document.querySelector('.search-info').classList.remove('hide'),
        document.querySelector('.banner').classList.add('hide'),
        document.querySelector('.filter').classList.add('hide'),
        document.querySelector('.movies').classList.add('hide'),
        document.querySelector('.footer').classList.remove('hide'),
        document.querySelector('.watchlist').classList.add('hide');
});

