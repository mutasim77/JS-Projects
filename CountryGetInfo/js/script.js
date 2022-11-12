let input = document.querySelector('input');
let btn = document.querySelector('.btn');
let error = document.querySelector('.error');

//! Get name from Input
btn.addEventListener('click', () => {
    btn.classList.remove('hide');
    setTimeout(() => {
        btn.classList.add('hide');
    }, 1000);
    getCountries(`https://restcountries.com/v3.1/name/${input.value}`);
});

//! Fetch API
function getCountries(url) {
    fetch(url).then(res => res.json()).then(data => {
        showCountries(data);
    })
};

//! Show Countries
function showCountries(data) {
    if (data.status !== 404) {
        error.classList.add('hide');

        if (document.querySelector('.info')) {
            document.querySelector('.info').remove();
        }

        let { flags, capital, continents, languages, currencies, population, name } = data[0];
        let currency = '', language = '';

        for (let prop in languages) {
            language += languages[prop] + ', ';
        }

        for (let prop in currencies) {
            currency = currencies[prop].name + ' : ' + currencies[prop].symbol;
        }

        const element = document.createElement('div');
        element.classList.add('info');
        element.innerHTML =
            `
            <img src="${flags.png}" alt="Flag">
            <div class="info-name center">${name.common}</div>
            <div class="info-official-name">Official Name: <span>${name.official}</span></div>
            <div class="info-capital">Capital: <span>${capital}</span></div>
            <div class="info-population">Population: <span>${numberWithCommas(population)}</span></div>
            <div class="info-continent">Continent: <span>${continents}</span></div>
            <div class="info-currency">Currency: <span> ${currency}</span></div>
            <div class="info-language">Language: <span>${language}</span></div>
        `
        document.querySelector('.container').appendChild(element);

    } else {
        if (document.querySelector('.info')) {
            document.querySelector('.info').remove();
        }
        error.classList.remove('hide');
    }
}

//! Number with Commas
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}