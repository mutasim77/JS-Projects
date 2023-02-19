import RickMortyService from "./rickMortyService.js";

//! class that fetch data and return needed result
const api = new RickMortyService();

function getCharacters(page = 1) {
    api.getAllCharacters(page)
        .then(item => {
            showAllCharacters(item);
        })
}

getCharacters();

//! Function that create all cards
function showAllCharacters(arr) {
    //! create card of each character
    arr.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-aos', 'flip-left');
        card.innerHTML =
            `
            <img src="${item.image}" alt="${item.name}" data-id="${item.id}">
            <div class="flex alig-center justify-between pr-2">
                <h3 class="name">${item.name}</h3>
                <div class="like"><i class="fa fa-heart" aria-hidden="true"></i></div>
            </div>
        `;
        document.querySelector('#cards').appendChild(card);
    });

    //! Add click listener for all like buttons, for adding to favorite characters or deleting
    document.querySelectorAll('.like i').forEach(btn => {
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

    //! Add click Listener for all cards showModal
    document.querySelectorAll('.card img').forEach(item => {
        item.addEventListener('click', (event) => {
            const target = event.target.getAttribute('data-id');
            showModalInfo(target);
        })
    })
}

//! Save favoriter characters
const objFavChars = {};
function favCharacters(picture, name) {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.innerHTML = `<img src="${picture}" alt="${name}">`;

    document.querySelector('#favorites').appendChild(circle);
    objFavChars[name] = picture;
    // location.reload()
    console.log(objFavChars);
    localStorage.setItem('data', objFavChars);
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

//! More Button
let countPage = 2;
const buttonMore = document.querySelector('.btn#more');
buttonMore.addEventListener('click', () => {
    getCharacters(countPage++);
});

//! Modal Window
const modal = document.querySelector('.modal');
function showModalInfo(id) {
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    api.getCharacterInfo(id).then(item => {

        //? length of 10 for item.created
        const modalWindow = document.querySelector('.modal-window');
        modalWindow.innerHTML =
            `
        < img src = "${item.image}" alt = "${item.name}" >
        <div class="flex flex-column info">
            <div class="name">Name : <span>${item.name}</span></div>
            <div class="status">Status : <span>${item.status}</span></div>
            <div class="species">Species : <span>${item.species}</span></div>
            <div class="gender">Gender : <span>${item.gender}</span></div>
            <div class="origin">Origin : <span>${item.origin.name}</span></div>
            <div class="location">Location : <span>${item.location.name}</span></div>
            <div class="created">Created : <span>${item.created.substring(0, 10)}</span></div>
        </div>
        <div class="close-btn">x</div>
    `;

        //! Close Modal Window
        const modalCloseBtn = document.querySelector('.close-btn');
        modalCloseBtn.addEventListener('click', () => {
            modal.classList.add('hide');
        });
    })
}

//! Modal Close if we click out of it
modal.addEventListener('click', (event) => {
    document.body.style.overflow = '';
    if (event.target == modal) {
        modal.classList.add('hide');
    }
})

//! Dark Mode
const buttonDark = document.querySelector('.dark-mode button');
buttonDark.addEventListener('click', () => {
    buttonDark.classList.toggle('dark');
    document.body.classList.toggle('dark');
});


//! Save in localstorage
// const localInfo = 


//! Run Aos Animations
AOS.init();
