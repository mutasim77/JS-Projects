let btn = document.querySelector('#btn');
let btnCopy = document.querySelector('#copy');

//! Enter Button
btn.addEventListener('click', () => {
    let input = document.querySelector('#input').value;
    $('.message').removeClass('copied');
    $('.message').removeClass('error');
    if (!isNaN(input)) {
        fetchData(`http://numbersapi.com/${input}`);
    } else {
        $('.message').addClass('error');
        $('.message').text('Please, Enter a number!');
    }
})

//! Fetch the Data
async function fetchData(url) {
    let data = await fetch(url);
    let result = await data.text();
    showResult(result);
}
//! Show the result of Fetching
function showResult(data) {
    $('.fact-desc h3').text(data.split(' ')[0]);
    $('.fact-desc p').text(data);
}

//! Copy Button
btnCopy.addEventListener('click', () => {
    let text = $('.fact-desc p').text();
    $('.message').removeClass('copied');
    navigator.clipboard.writeText(text).then(() => {
        $('.message').addClass('copied');
        $('.message').text('Copied Successfully!');
    })
})
