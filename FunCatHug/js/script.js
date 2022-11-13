let btnNo = document.querySelector('#no');
let btnYes = document.querySelector('#yes');

btnNo.addEventListener('mouseover', () => {
    btnNo.style.left = getRandom().toFixed(0) + 'px';
    btnNo.style.bottom = getRandom2().toFixed(0) + 'px';
});

function getRandom() {
    return Math.random() * 1000;
}

function getRandom2() {
    return Math.random() * 100;
}

btnYes.addEventListener('click', () => {
    alert('Thank you , lemme hug u <3');
});