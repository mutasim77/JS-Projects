
let text = document.querySelector('.text');
let increase = document.getElementById('increase');
let decrease = document.getElementById('decrease');
let restart = document.getElementById('restart');


// -1
decrease.addEventListener('click', () => {
    text.innerText = Number(text.innerText) - 1;
});

// +1
increase.addEventListener('click', () => {
    text.innerText = Number(text.innerText) + 1;
});

//reset
restart.addEventListener('click', () => {
    text.innerHTML = 0;
});

