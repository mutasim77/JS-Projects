import RickMortyService from "./rickMortyService.js";

//! class that fetch data and return needed result
const api = new RickMortyService();

api.getAllCharacters()
    .then(item => {
        showAllCharacters(item);
    })

//! Function that create all cards
function showAllCharacters(arr) {
    //! create card of each character
    arr.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML =
            `
            <img src="${item.image}" alt="${item.name}">
            <div class="flex alig-center justify-between pr-2">
                <h3 class="name">${item.name}</h3>
                <div class="like"><i class="fa fa-heart" aria-hidden="true"></i></div>
            </div>
        `;
        document.querySelector('#cards').appendChild(card);
    });

    //! Add click listener for all like buttons, for adding to favorite characters or deleting
    document.querySelectorAll('.like').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const target = event.target;
            const parentElement = target.parentElement.parentElement.parentElement;
            const picture = parentElement.firstElementChild.src;
            const name = parentElement.firstElementChild.alt;

            if (target.classList.contains('liked')) {
                target.classList.remove('liked');
                delCharacters(name);
            } else {
                target.classList.add('liked');
                favCharacters(picture, name);
            }

        });
    });
}

//! Save favoriter characters
function favCharacters(picture, name) {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.innerHTML = `<img src="${picture}" alt="${name}">`;

    document.querySelector('#favorites').appendChild(circle);
}

//! Delete favorite characters
function delCharacters(name) {
    const circles = document.querySelectorAll('.circle img');
    circles.forEach(img => {
        if (img.alt === name) {
            img.parentElement.remove();
        }
    });
}