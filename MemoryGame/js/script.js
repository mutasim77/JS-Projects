import { duplicate, shuffle, guessedCard, flipReverse, unClickble, show, hide, timerStart, userWon } from "./utils.js";
//! Variables
const imageArrayWeb = ['angular.png', 'bootstrap.png', 'css.png', 'git.png', 'github.png', 'html.png', 'js.png', 'ls.png', 'react.png', 'sass.png', 'ts.png', 'vue.png'];
const imageArrayMarvel = ['deadPool.png', 'dStrange.png', 'hulk.png', 'iMan.png', 'moonK.png', 'natasha.png', 'cAmerica.png', 'spider.png', 'tanos.png', 'tor.png', 'vanda.png', 'x.png'];
const imageArrayAnime = ['asuna.png', 'edvard.png', 'erenYeger.png', 'itachi.png', 'kakasi.png', 'kurisu.png', 'laytYagami.png', 'leviAkkerman.png', 'manki.png', 'naruto.png', 'saski.png', 'sonGoku.png'];
let checkedCards = [];
let removeArray = [];
let movesCounter = 1;
let wonCounter = 0;
//! Start Page 
let userName = document.querySelector('#name'); //name of usere
let startBtn = document.querySelector('#start'); // to start the game
let selectedBtn = document.querySelector('.game-categories'); // to find category
let mainPages = document.querySelectorAll('main');
let animateName = document.querySelector('.name-animate span');
let userMoves = document.querySelector('.moves span');

//! Select Category
selectedBtn.addEventListener('click', (event) => {
    if (!event.target.classList.contains('game-categories')) {
        selectedBtn = event.target.classList.value;
    }
});

//! Result of Shuffling and Duplicating Array
const resultCards = (array) => shuffle(duplicate(array));

//! Start The Game
startBtn.addEventListener('click', () => {
    userName = userName.value;
    if (selectedBtn != 'anime' && selectedBtn != 'marvel' && selectedBtn != 'web') {
        return;
    }

    //? Hide the Start Page and Show Game Page
    hide(mainPages[0]);
    show(mainPages[1]);

    //? User name with animation
    animateName.innerHTML = userName ? userName : "No name";

    switch (selectedBtn) {
        case "anime":
            createCards(selectedBtn, resultCards(imageArrayAnime));
            document.body.classList.add('anime');
            break;
        case "marvel":
            createCards(selectedBtn, resultCards(imageArrayMarvel));
            document.body.classList.add('marvel');
            break;
        case "web":
            createCards(selectedBtn, resultCards(imageArrayWeb));
            document.body.classList.add('web');
            break;
        default:
            console.log("U didn't choose the category of Game");
    }

    //! Call Flipping Cards
    flippingCards();
    //! Start Timer 
    timerStart();
});

//! Create Cards
function createCards(filePath, array) {
    array.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('memory-card');
        element.innerHTML =
            `
        <div class="front-card">
            <img src="img/${filePath}/${item}" alt="${filePath}">
        </div>
        <div class="back-card">
            <img src="/img/qustion.gif" alt="question.gif">
        </div>
        `
        document.querySelector('.container').appendChild(element);
    })
}

//! Check Two Cards
function checkCards(card, check) {
    let cardName = check.getAttribute('src'); // get the pictures name
    checkedCards.push(cardName);
    removeArray.push(card);
    setTimeout(() => {
        if (checkedCards.length >= 2) {
            if (checkedCards[0] === checkedCards[1]) {
                wonCounter++;
                if (checkedCards.length > 2) {
                    for (let i = 2; i <= checkCards.length; i++) {
                        removeArray[i].style.pointerEvents = 'auto';
                        removeArray[i].classList.remove('flip')
                    }
                }
                guessedCard(removeArray[0]);
                guessedCard(removeArray[1]);
                removeArray = [];
                checkedCards = [];
                userWon(movesCounter, wonCounter);
            } else {
                flipReverse(removeArray);
                unClickble(removeArray);
                removeArray = [];
                checkedCards = [];
            }
        }
    }, 1500)
}

//! Flipping Cards
function flippingCards() {
    const cards = document.querySelectorAll('.memory-card');
    function flipCard() {
        this.classList.add('flip');
        this.style.pointerEvents = 'none'; // unclickble
        let parent = this; // parent -> div.memory-card
        let child = parent.children[0]; // the first div from parent, which is front-card;
        let grandchild = child.children[0]; // the first div from child, which is img;
        checkCards(parent, grandchild);
        userMoves.innerText = movesCounter++;
    }
    cards.forEach(card => card.addEventListener('click', flipCard));
}

//! Restart The Game by refreshing page
let restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', () => {
    window.location.reload();
});
