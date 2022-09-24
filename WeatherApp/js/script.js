const API_KEY = `934a1d29663bbe0201bd0c38ba86fe4c`;
const message = document.querySelector('.message');
const btn = document.querySelector('.btn');
const input = document.querySelector('input');
let isCountry = true;


//? Get DeviceGeolocation
btn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert('Your browser not support geolocation API');
    }
});

function onSuccess(possition) {
    let longitude = possition.coords.longitude;
    let latitude = possition.coords.latitude;
    fetchUrl(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
}

function onError(error) {
    message.innerHTML = error.message;
    message.style.backgroundColor = 'rgb(245, 167, 167)';
    message.style.display = 'block';
}

//! fetchData 
function fetchUrl(url) {
    message.innerHTML = 'Getting weather details...'
    message.style.backgroundColor = '#abeecf80';
    message.style.display = 'block';
    fetch(url).then((response) => response.json().then((data) => {
        showWeather(data);
    }));
}

function showWeather(data) {
    if (data.cod == "404") {
        isCountry = false;
        message.innerHTML = `'${input.value}' isn't valid city name`;
        message.style.backgroundColor = 'rgb(245, 167, 167)';
        message.style.display = 'block';
    } else {
        let { humidity, temp, feels_like } = data.main;
        let icon = data.weather;
        document.querySelector('.container2-hide').innerHTML =

            `
            <div class="app-name">
                <i class="bx bx-left-arrow-alt" id="back-btn"></i>
                <p>Weather App</p>
            </div>
            <div class="center">
                <img src="http://openweathermap.org/img/wn/${icon[0].icon}@4x.png" alt="weatherPic">
                <div class="degree">${Math.ceil(temp)}&#176; C</div>
                <div class="weather-name">${icon[0].description}</div>
                <div class="location"><i class="bx bx-map"></i>${data.name}</div>
            </div>
    
            <div class="weather-info">
                <div class="feels-like column">
                    <div>
                        <i class="bx bxs-thermometer"></i>
                    </div>
                    <div>
                        <div class="feels-like-degree">${feels_like}&#176; C</div>
                        <div class="feels-like-name">Feels like</div>
                    </div>
                </div>
                <div class="humidity column">
                    <div>
                        <i class="bx bxs-droplet-half"></i>
                    </div>
                    <div>
                        <div class="feels-like-degree">${humidity}%</div>
                        <div class="feels-like-name">Humidity</div>
                    </div>
                </div>
            </div>
            `
        document.querySelector('.container1-hide').classList.add('hide'),
            document.querySelector('.container2-hide').classList.remove('hide');

        //! back Button
        document.getElementById('back-btn').addEventListener('click', () => {
            message.style.display = 'none';
            document.querySelector('.container1-hide').classList.remove('hide'),
                document.querySelector('.container2-hide').classList.add('hide');
        });
    }
}

//! input getCountryName 
input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && input.value != "") {
        document.querySelector('.container2-hide').innerHTML = '';
        searchDataByName(e.target.value);
        setTimeout(() => {
            if (isCountry) {
                document.querySelector('.container1-hide').classList.add('hide'),
                    document.querySelector('.container2-hide').classList.remove('hide');
            }
        }, 2000)
    }
});

//! BY NAME 
function searchDataByName(value) {
    fetchUrl(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_KEY}&units=metric`);
}



