let btn = document.querySelector('.btn');
let reset = document.querySelector('.reset');
let info = document.querySelector('.info');
let counter = 0;
let guessArray = [];
let number = getRandom(100, 1);
let notFount = true;
//! while button click;
btn.addEventListener('click', () => {
    info.style.color = '#000';
    let guessNumber = document.querySelector('input').value;
    if (isNaN(guessNumber) || !guessNumber) {
        info.innerHTML = 'Ouuppss! Please inter a number!';
    } else {
        if (guessNumber == number) {
            info.innerHTML = 'Yaaaaah! You Found it!';
            info.style.color = 'red';
            info.style.fontSize = '1.5em';
            document.querySelector('.num-of-guesses').innerHTML = `The number was: ${number}`;
            document.querySelector('.guessed-numbers').innerHTML = `You guessed it in ${counter} guesses`;
            notFount = false;
            show(reset);
            hide(btn);
            //! reset the game by reloading page
            reset.addEventListener('click', () => {
                window.location.reload();
            });
        }
        else if (guessNumber > number) {
            info.innerHTML = 'Your answer is too <span style="color: red; font-size: 1.2em;">high</span>'
        } else if (guessNumber < number) {
            info.innerHTML = 'Your answer is too <span style="color: red; font-size: 1.2em;">low</span>'
        }
        if (notFount) {
            //! Number of guesses
            counter++;
            document.querySelector('.num-of-guesses span').innerHTML = `${counter}`;

            //! Guessed numbers
            guessArray.push(guessNumber);
            document.querySelector('.guessed-numbers span').innerHTML = `${guessArray}`;
        }
    }
});

//! show element
function show(el) {
    el.classList.remove('hide');
}

//! hide element
function hide(el) {
    el.classList.add('hide');
}

//! get Random number each time
function getRandom(max, min) {
    return Math.floor(Math.random() * (max - min) + min); //* value between max and min -> 1-100;
}