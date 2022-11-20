//! Duplicate Array of Images
export const duplicate = (array) => array.reduce((res, current) => res.concat([current, current]), []);

//! Shuffle Array 
export const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

//! Remove Cards If they are equal
export function guessedCard(card) {
    // card.children[0].style.opacity = '40%';
    card.children[0].style.visibility = 'hidden';
    card.style.pointerEvents = 'none';
}

//! Flipp Reverese\
export function flipReverse(array) {
    array.forEach(item => item.classList.remove('flip'));
}

//! Remove unclickble function
export function unClickble(array) {
    array.forEach(item => item.style.pointerEvents = 'auto');
}

//! SHOW
export function show(node) {
    node.classList.remove('hide');
}

//! HIDE
export function hide(node) {
    node.classList.add('hide');
}

//! Timer
let second = 0;
let min = 0;
let interval;
export function timerStart() {
    let timer = document.querySelector('.timer span');
    interval = setInterval(() => {
        second++;
        if (second < 60) {
            if (second < 10) {
                timer.innerHTML = `0${min} : 0${second}`;
            }
            else
                timer.innerHTML = `0${min} : ${second}`;
        } else {
            second = 0;
            min++;
        }
    }, 1000);
}

//! User Won
export function userWon(moves, count) {
    if (count === 12) {
        clearInterval(interval);
        swal({
            title: `${document.querySelector('.name-animate span').innerText}, you finished!`,
            text: `With ${moves - 1} moves under ${document.querySelector('.timer span').innerText} seconds, \n it's a great result🥳`,
            icon: "success",
            buttons: ["Reset Game", "Cancel"],
        }).then((willDelete) => {
            if (willDelete) {
            } else {
                window.location.reload();
            }
        });
    }
}