import RickMortyService from "./rickMortyService.js";

const api = new RickMortyService();

api.getAllCharacters()
    .then(item => {
        showAllCharacters(item);
    })

function showAllCharacters(arr) {
    arr.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML =
            `
            <img src="${item.image}"
                alt="rick">
            <div class="flex alig-center justify-between pr-2">
                <h3 class="name">${item.name}</h3>
                <div class="like"><i class="fa fa-heart" aria-hidden="true"></i></div>
            </div>
        `;
        document.querySelector('#cards').append(card);
    })
}