const API_URL = 'http://www.themealdb.com/api/json/v1/1/search.php?s=';

const input = document.querySelector('.button input'),
    searchBtn = document.querySelector('.button button'),
    message = document.querySelector('.message'),
    resultBlock = document.querySelector('.result-block'),
    result = document.querySelector('.result'),
    noResultMessage = document.querySelector('.no-result'),
    infoAboutFoods = document.querySelector(".info-about-foods");

//! When we click search button
searchBtn.addEventListener('click', () => {
    if (!input.value || !isNaN(input.value)) {
        message.classList.add('show');
    } else {
        let url = API_URL + input.value;
        fetchData(url)
    }

});

//! Fetch the API
function fetchData(url) {
    fetch(url).then(res => res.json()).then(data => {
        createCard(data.meals);
    });
}

//! Create Card with loop
function createCard(data) {
    resultBlock.innerHTML = '';
    noResultMessage.classList.add('hide');
    message.classList.remove('show');
    if (data !== null) {
        data.forEach(item => {
            resultBlock.innerHTML +=
                `
            <div class="result-card">
                <img src="${item.strMealThumb}"
                alt="${item.idMeal}">
                <h3 data-id="${item.idMeal}">${item.strMeal}</h3>
                <button class="recipe">Get Recipe</button>
            </div>
            `
        });
        document.querySelectorAll('.recipe').forEach(food => {
            food.addEventListener('click', getRecipe);
        })
    } else {
        noResultMessage.classList.remove('hide');
    }
}


//! Get The recipe
function getRecipe(event) {
    // result.classList.add('hide');
    // infoAboutFoods.classList.remove('hide');
    let id = (event.target.previousElementSibling).getAttribute('data-id'); // get ID of food
    fetch(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then(data => showRecipe(data.meals));
}

function showRecipe(data) {
    data.forEach(item => {
        let { strMeal, strInstructions } = item;
        let map = {};
        //? get ingredients
        for (let i = 1; i <= 20; i++) {
            let x = `strIngredient${i}`
            let y = `strMeasure${i}`;
            map[item[x]] = item[y]
        }

        console.log(Object.keys(map).forEach(item => console.log(item)));
    });
}
