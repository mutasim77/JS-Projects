let btn = document.querySelector('#change-quote');
let blockQuote = document.querySelector('blockquote p');
let author = document.querySelector('.author span');
let btnCopy = document.querySelector('#copy');
let message = document.querySelector('.message');


//! copy button
btnCopy.addEventListener('click', () => {
    let text = document.querySelector('blockquote p').innerText;
    navigator.clipboard.writeText(text).then(() => {
        message.classList.remove('hide');
    })
})


//! Spech


//! Fetch the Data from API
async function getQuotes(url) {
    const res = await fetch(url);
    const quotes = await res.json();
    showQuotes(quotes);
}
getQuotes("https://type.fit/api/quotes");

let counter = 1000;
function showQuotes(quotes) {
    let arr = quotes;

    //! Get new Quote
    btn.addEventListener('click', () => {
        counter++;
        blockQuote.innerText = arr[counter].text;
        author.innerText = arr[counter].author;
        message.classList.add('hide');
    })
}