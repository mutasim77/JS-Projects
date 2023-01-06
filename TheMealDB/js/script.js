const API_URL = 'http://www.themealdb.com/api/json/v1/1/search.php?s=';

const input = document.querySelector('.button input'),
    searchBtn = document.querySelector('.button button'),
    message = document.querySelector('.message'),
    resultBlock = document.querySelector('.result-block'),
    result = document.querySelector('.result'),
    noResultMessage = document.querySelector('.no-result'),
    infoAboutFoods = document.querySelector(".info-about-foods"),
    ingredientCards = document.querySelector('.ingredient-cards'),
    instructions = document.querySelector('.left-side p');

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
            food.addEventListener('click', fetchRecipe);
        })
    } else {
        noResultMessage.classList.remove('hide');
    }
}


//! Get The recipe
function fetchRecipe(event) {
    // result.classList.add('hide');
    // infoAboutFoods.classList.remove('hide');
    let id = (event.target.previousElementSibling).getAttribute('data-id'); // get ID of food
    fetch(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then(data => showRecipe(data.meals[0]));
}

function showRecipe(data) {
    let { strMeal, strInstructions } = item;
    let result = getRecipe(data);

    for (let [key, value] of Object.entries(result)) {
        if (!key) continue;
        console.log(key, value);
        ingredientCards.innerHTML +=
            `
            <div class="card">
                <img src="https://www.themealdb.com/images/ingredients/${key}.png" alt="${key}">
                <p>${value} <span>${key}</span></p>
            </div>
            
            `
    }

    document.querySelector('.left-side h2').textContent = strMeal;
    instructions.textContent = strInstructions;

}

function getRecipe(data) {
    let map = {};

    //? get ingredients
    for (let i = 1; i <= 20; i++) {
        let x = `strIngredient${i}`; //* ingredient
        let y = `strMeasure${i}`; //* measure
        map[data[x]] = data[y]; //? save ingredient as a key and measure as a value;
    }
    return map;
}