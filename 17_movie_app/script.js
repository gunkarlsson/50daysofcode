const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1b0fe85392a0de289e401e2f384cf20b&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=1b0fe85392a0de289e401e2f384cf20b&query="';
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const searchButton = document.querySelector(".search-button");
const input = document.querySelector(".input");

searchButton.addEventListener("click", () => {
  form.classList.toggle("active");
  input.focus();
});

//Get initial movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
  //data.results är argumentet
}

//(movies) = data.results fast med nytt coolt namn. parameter
function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
        <img 
          src="${IMG_PATH + poster_path}"
          alt="${title}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
      `;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload;
  }
});

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button, idx) => {
  button.addEventListener("click", () => highlightbuttons(idx));
});

function highlightbuttons(idx) {
  const page = idx + 1;

  getMovies(API_URL + page);

  buttons.forEach((button, idx2) => {
    if (idx2 == idx) {
      button.classList.add("full");
    } else {
      button.classList.remove("full");
    }
  });
}
