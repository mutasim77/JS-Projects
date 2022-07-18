const $start = document.querySelector('#start');
const $game = document.querySelector('#game');
const $time = document.querySelector('#time');
const $timeHeader = document.querySelector('#time-header');
const $resultHeader = document.querySelector('#result-header');
const $result = document.querySelector('#result');
const $gameTime = document.querySelector('#game-time');

var score = 0; //our score
var isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime)

function startGame() {
    score = 0;
    setGameTime();
    $gameTime.setAttribute('disabled', 'true');
    hide($start)
    $game.style.backgroundColor = '#fff';
    isGameStarted = true;

    var interval = setInterval(function () {
        let time = parseFloat($time.textContent);
        if (time <= 0) {
            endGame();
            clearInterval(interval);
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }

    }, 100);

    renderBox();
}

function setScoreGame() {
    $result.textContent = score.toString();
}

function setGameTime() {
    let time = +$gameTime.value;
    $time.textContent = time.toFixed(1);
    show($timeHeader);
    hide($resultHeader);
}

function endGame() {
    isGameStarted = false;
    $game.innerHTML = ''
    show($start);
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader);
    show($resultHeader);
    setScoreGame();
    $gameTime.removeAttribute('disabled');

}

function handleBoxClick(event) {
    if (isGameStarted) { //if game is start it will be true and it gonna work 
        if (event.target.dataset.box) {
            score++;
            renderBox();
        }
    }

}

function renderBox() {
    $game.innerHTML = ''; //clear our block each time after click
    const box = document.createElement('div'); //createElement -> we create new tag and than we can add it to our DOM HTML 
    let boxSize = getRandom(30, 100);
    let gameSize = $game.getBoundingClientRect(); //get info about tag -> like width height left and right ==(position of tag)
    let colorChange = getRandom(100, 200);

    let maxLeft = gameSize.width - boxSize; // width -> to the left by X
    let maxTop = gameSize.height - boxSize; // heigth -> to the top by Y

    box.style.height = box.style.width = boxSize + 'px';  // by this way we can add value for 2 elements
    box.style.backgroundColor = '#000';
    box.style.position = 'absolute';
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');

    box.style.backgroundColor = '#' + colorChange;
    $game.insertAdjacentElement('afterbegin', box); //add new tag in HTML DOM
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function show($element) {
    $element.classList.remove('hide');
}

function hide($element) {
    $element.classList.add('hide');
}