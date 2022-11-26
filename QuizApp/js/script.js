import { questions } from './qustionsBox.js';

//! Variables
let _question = document.querySelector('.question');
let _options = document.querySelectorAll('.option-name');
let _nextButton = document.querySelector('.btn');
let _timer = document.querySelector('.timer span');
let $counter = 0;
let _countQustions = $('.count-questions');
let $true = `<i class="fa-solid fa-check"></i>`;
let $false = `<i class="fa-solid fa-xmark"></i>`;
let $correctAnswer = 0;
let seconds = 30;
let interval;

//! when page reload, the game will start;
window.onload = startGame($counter);

//! Choose The Options;
$('.option').on('click', (event) => {
    let clientAnswer = (event.target.innerText);
    document.querySelectorAll('.option').forEach(item => {
        item.style.pointerEvents = 'none';
    });
    if (clientAnswer == questions[$counter].answer) {
        $(event.target).addClass('green');
        $(event.target).append($true);
        $correctAnswer++;
    } else {
        $(event.target).addClass('red');
        $(event.target).append($false);
    }
});

//! Next Button while we click;
_nextButton.addEventListener('click', () => {
    startGame(++$counter);
});

//! Start The Game;
function startGame($counter) {
    seconds = 30;
    if ($counter < questions.length) {
        _question.innerHTML = ` ${questions[$counter].numb}. ${questions[$counter].question}`;
        _countQustions.text(`${$counter + 1} of ${questions.length} Questions`);
        _options.forEach((item, index) => {
            item.innerHTML = questions[$counter].options[index];
        });
        if ($counter == questions.length - 1) {
            _nextButton.innerText = 'Finish';
        }
        document.querySelectorAll('.option').forEach(item => {
            item.style.pointerEvents = 'auto';
            item.classList.remove('green') || item.classList.remove('red');
            $('.fa-solid').remove();
        })
    } else {
        endGame();
    }
}

//! When we click Finished (Shows The Result);
function endGame() {
    clearInterval(interval);
    $('.modal-window').css('display', 'flex');
    $('.modal-window').addClass('active');
    let info = $('.info span');
    info[0].innerHTML = $correctAnswer;
    info[1].innerHTML = questions.length;
    resultStatus($correctAnswer, questions.length);
    $('#restart').on('click', () => window.location.reload());
}

//! Check the result status
function resultStatus(correct, nquesions) {
    let status = $('.result-status');
    if (correct == nquesions) {
        status.text('You are genius 🤓');
    } else if (correct == 0 || correct == 1) {
        status.html(`You haven't failed until you quit trying. <br> Practice makes improvment`);
    } else if (correct > 1 && correct <= (Math.ceil(questions.length / 2))) {
        status.text(`It's a great result! 👏🏻`);
    }
}

//! Timer
timer();
function timer() {
    interval = setInterval(() => {
        if (seconds > 0) {
            seconds < 10 ? _timer.innerHTML = `0${seconds}` : _timer.innerHTML = `${seconds}`;
        }

        if (seconds == 0) {
            startGame(++$counter)
            seconds = 30;
        }
        seconds--;

    }, 1000);
}