const btns = document.querySelectorAll('.column');
const message = document.querySelector('.message');
const hideResult = document.querySelector('.result');
const btnClear = document.querySelector('.btn');

let emptyMassive = ['', '', '', '', '', '', '', '', '']; //then we put here value of btn; -> X or O
var num = 0;
//all possible cases for winning the game
const allPossibleCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

btns.forEach((element, index) => {
    element.addEventListener('click', () => startGame(element, index));
});

function startGame(element, index) {
    if (num % 2 === 0) {
        element.textContent = '❌'
        element.classList.add('disable');
        element.style.color = '#ac50ff'
        message.textContent = 'Player: 2 💁🏾‍♂️'
        emptyMassive[index] = element.textContent;
        num++;
    } else {
        element.textContent = '〇';
        element.style.color = 'rgb(0 255 157)'
        element.classList.add('disable2');
        message.textContent = 'Player: 1 💁🏼‍♂️';
        emptyMassive[index] = element.textContent;
        num++;
    }
    for (let i = 0; i < allPossibleCases.length; i++) {
        let oneCase = allPossibleCases[i];
        let x = emptyMassive[oneCase[0]];
        let y = emptyMassive[oneCase[1]];
        let z = emptyMassive[oneCase[2]];

        if (x === '' || y === '' || z === '') {
            continue;
        }
        if ((x === y) && (y === z)) {
            hideResult.classList.remove('hide');
            hideResult.textContent = `Player: ${x === '❌' ? '1 Win! 🙆🏼‍♂️' : '2 🙆🏾‍♂️ Win!'}🎊`
            message.textContent = `Player: ${x === '❌' ? '2 Lose 🙍🏾‍♂️' : '1  Lose 🙍🏼‍♂️'} `;
            btnClear.textContent = 'Try Again!'
            btns.forEach((btn) => btn.disabled = true);
        }
        if (num > 8) {
            hideResult.classList.add('draw');
            hideResult.textContent = `It's a Draw`
            message.textContent = `We have no loser `
        }
    }
}
//reset game
btnClear.onclick = () => {
    num = 0;
    emptyMassive = ['', '', '', '', '', '', '', '', ''];
    message.textContent = 'Player: 1 💁🏼‍♂️'
    hideResult.classList.add('hide');
    hideResult.classList.remove('draw');
    btnClear.textContent = 'Reset'

    btns.forEach((btn) => {
        btn.textContent = '';
        btn.classList.remove('disable');
        btn.classList.remove('disable2');
    });
}
