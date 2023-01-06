const API_URL = 'http://www.themealdb.com/api/json/v1/1/search.php?s=';

const input = document.querySelector('.button input'),
    searchBtn = document.querySelector('.button button'),
    message = document.querySelector('.message'),
    resultBlock = document.querySelector('.result-block'),
    noResultMessage = document.querySelector('.no-result');

searchBtn.addEventListener('click', () => {
    if (!input.value || !isNaN(input.value)) {
        message.classList.add('show');
    } else {
        let url = API_URL + input.value;
        fetchData(url)
    }

});

function fetchData(url) {

    fetch(url).then(res => res.json()).then(data => {
        createCard(data);
    });
}

function createCard(data) {
    resultBlock.innerHTML = '';
    if (data.meals !== null) {

    } else {
        noResultMessage.classList.remove('hide');
    }
    console.log(data);
}