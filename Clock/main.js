//Switch to DarkMode
let darkMode = document.querySelector('.dayNight');
let body = document.querySelector('body');
let footerText = document.querySelector('.footer');

darkMode.onclick = function () {
    darkMode.classList.toggle('active');
    body.classList.toggle('dark');
    footerText.classList.toggle('white');
}

//Start timer
const start = setInterval(function () {
    // Hour
    let hour = new Date();
    const saveHour = hour.toLocaleString('en-US', { hour: 'numeric', hour12: true }).split(' '); // split the time and AM & PM
    // Minutes  
    let minutes = new Date();
    const saveMinutes = minutes.toLocaleString('en-US', { minute: 'numeric', hour12: true });
    // Seconds
    let seconds = new Date();

    document.querySelector('.hour').innerHTML = saveHour[0];
    document.querySelector('.pm-am').innerHTML = saveHour[1];

    //if minutes less than 10 , than add zero before
    if (saveMinutes < 10) {
        document.querySelector('.minutes').innerHTML = '0' + saveMinutes;
    } else {
        document.querySelector('.minutes').innerHTML = saveMinutes;
    }
    //if seconds less than 10 , than add zero before
    if (seconds.getSeconds() < 10) {
        document.querySelector('.seconds').innerHTML = '0' + seconds.getSeconds();
    } else {
        document.querySelector('.seconds').innerHTML = seconds.getSeconds();
    }

}, 1000); //each 1 seconds