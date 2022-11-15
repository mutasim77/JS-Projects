let btn = document.querySelector('.btn');
let text = document.querySelector('.info');

btn.addEventListener('click', () => {
    let value = document.querySelector('input').value;
    let newWord = value.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '').toLowerCase();
    let rev = newWord.split('').reverse().join('');
    if (newWord == rev) {
        text.innerText = `Yes! It's a Palindrome!`;
    } else {
        text.innerText = `Nope! Not a Palindrome!`;
    }
});