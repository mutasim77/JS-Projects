const textarea = document.querySelector('#textarea');

textarea.onclick = function () {
    const text = document.querySelector('.counter');
    let start = setInterval(function () {
        let characters = document.querySelector('textarea').textLength; //length
        let words = document.querySelector('textarea').value.split(' '); // words

        //remove all spaces from array
        let newArray = words.filter(function (words) {
            return /\S/.test(words);
        });
        let numberWords = newArray.length;
        text.textContent = numberWords + ' words ' + characters + ' characters';

    }, 100)

    // clear button
    let btn = document.querySelector('#button');
    btn.onclick = function () {
        clearInterval(start);
        document.querySelector('textarea').value = ''; // clear all
        document.querySelector('.counter').textContent = '0 words 0 characters';
    }
};

