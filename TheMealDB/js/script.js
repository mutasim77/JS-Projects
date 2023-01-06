const input = document.querySelector('.button input'),
    searchBtn = document.querySelector('.button button'),
    message = document.querySelector('.message');
searchBtn.addEventListener('click', () => {
    if (!input.value || !isNaN(input.value)) {
        message.classList.add('show');
    } else {

    }

});