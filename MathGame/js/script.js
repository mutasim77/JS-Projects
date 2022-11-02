showResult();

//! Show Container
function showResult() {

    let num1 = randomNum(); // 10
    let num2 = randomNum(); // 20
    let opp = randomOperation(); // '+'
    if ((opp == '-' && num2 > num1) || (opp == '/' && num2 > num1)) {
        [num1, num2] = [num2, num1];
    } else if ((opp == '+' && num1 > num2) || (opp == '*' && num1 > num2)) {
        [num1, num2] = [num2, num1];
    }

    const numElement = document.createElement('div');
    numElement.classList.add('flex');
    numElement.classList.add('flex-column');
    numElement.innerHTML =

        `
        <div class="text">Fill in the blank correct number of operator</div>
        <div class="main flex">
            <span class="value">${num1}</span>
            <span class="operation">${opp}</span>
            <input type="text" class="input" placeholder="?">
            <span>=</span>
            <span class="result">${num2}</span>
        </div>
        <button class="btn">Submit</button>
        <span class="error hide">It cannot be empty!</span>
    `

    document.querySelector('.container').appendChild(numElement);

    //!Submit 
    let btnSubmit = document.querySelector('.btn');
    let input = document.querySelector('.input');
    let value = +document.querySelector('.value').textContent;
    let operation = document.querySelector('.operation').textContent;
    let result = +document.querySelector('.result').textContent;
    let container = document.querySelector('.container');
    let resultPart = document.querySelector('.result-part');
    let restartBtn = document.querySelector('#res');
    let eror = document.querySelector('.error');

    btnSubmit.addEventListener('click', checkResult);

    //! Check Result
    function checkResult() {
        if (!input.value) {
            eror.classList.remove('hide');
        } else {
            eror.classList.add('hide');
            const mathResult = math_operations[operation](value, +input.value);

            if (mathResult == result) {
                hide();
                document.querySelector('.hidetext').innerHTML = 'Wow!! Correct Answer';
                restartBtn.addEventListener('click', show);
                container.innerHTML = ''
                showResult()
            } else {
                hide();
                document.querySelector('.hidetext').innerHTML = 'Opps!! Wrong Answer';
                restartBtn.addEventListener('click', show);
                container.innerHTML = ''
                showResult()
            }
        }
    }

    //! Hide container
    function hide() {
        container.classList.add('hide');
        resultPart.classList.remove('hide');
    }

    //! Shoe container
    function show() {
        container.classList.remove('hide');
        resultPart.classList.add('hide');
    }

    //! Math Operations
    const math_operations = {
        '+': function (x, y) { return x + y },
        '-': function (x, y) { return x - y },
        '*': function (x, y) { return x * y },
        '/': function (x, y) { return x / y }
    };

    //! Random Numbers
    function randomNum() {
        return Math.floor(Math.random() * (50 - 1)) + 1; // (max - min) + min -> (50 - 1) + 1;
    }

    //! Operation Random
    function randomOperation() {
        let arr = ['+', '-', '*', '/'];
        let rand = ((Math.random() * 3)).toFixed(0);
        return arr[rand];
    }

}


