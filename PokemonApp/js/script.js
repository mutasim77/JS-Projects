const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
}
const API = 'https://pokeapi.co/api/v2/pokemon/';
const card = document.querySelector('.card')
const btn = document.querySelector('.btn')

btn.addEventListener('click', () => {
    let id = Math.floor(Math.random() * 150) + 1;
    let URL = API + id;
    fetch(URL)
        .then((res) => res.json())
        .then((result) => {
            createCard(result);
        })
})

//! Create Cards 
function createCard(data) {
    let name = data.name;
    let image = data.sprites.other.dream_world.front_default;
    let themeColor = data.types[0].type.name;

    card.innerHTML =
        `
        <div class="hp">
        <span>HP</span>
            30
        </div>
        <img src="${image}" alt="image">
        <div class="name">${name}</div>
        <div class="types">

        </div>
        <div class="list">
            <div class="attack">
                <h3>85</h3>
                <p>Attack</p>
            </div>
            <div class="deffence">
                <h3>90</h3>
                <p>Defense</p>
            </div>
            <div class="speed">
                <h3>90</h3>
                <p>Speed</p>
            </div>
        </div>
    `
    addTypes(data.types);
    bgColor(themeColor);
}

//! Add the Types
function addTypes(type) {
    let span = document.createElement('span');
    type.forEach(item => {
        span.innerText = item.type.name;
        document.querySelector('.types').appendChild(span);
    })
}

//! Change Background 
function bgColor(color) {
    console.log(color);
}
