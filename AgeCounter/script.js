//Today's DATE
const todaysYear = new Date().getFullYear();
document.querySelector('.today-year').innerHTML = todaysYear; //2022

//Today's Month
const todaysMonth = new Date().getMonth(); //to get correct the month we add +1 ; cause' month in js starts from 0
document.querySelector('.today-month').innerHTML = todaysMonth + 1 + '-';
if (todaysMonth < 10) {
    document.querySelector('.today-month').innerHTML = '0' + (1 + todaysMonth) + '-';
} else {
    document.querySelector('.today-month').innerHTML = 1 + todaysMonth + '-';
}

//Today's day
const todaysDay = new Date().getDate();
document.querySelector('.today-day').innerHTML = todaysDay + '-';
if (todaysDay < 10) {
    document.querySelector('.today-day').innerHTML = '0' + todaysDay + '-';
} else {
    document.querySelector('.today-day').innerHTML = todaysDay + '-';
}


//My b'day
const myBirthDay = new Date(2003, 3, 9);
// const birthYear = new Date(2003, 09, 03).getFullYear();
const birthYear = myBirthDay.getFullYear();
document.querySelector('.birth-year').innerHTML = birthYear;

// b'day month
const birthMonth = myBirthDay.getMonth();
if (birthMonth < 10) {
    document.querySelector('.birth-month').innerHTML = '0' + birthMonth + '-';
} else {
    document.querySelector('.birth-month').innerHTML = birthMonth + '-';
}

//b'day day
const birthDay = myBirthDay.getDate();
if (birthDay < 10) {
    document.querySelector('.birth-day').innerHTML = '0' + birthDay + '-';
} else {
    document.querySelector('.birth-day').innerHTML = birthDay + '-';
}


//Calculate AGE 

var start = setInterval(function () {
    const birth = new Date(2003, 3, 9);
    const now = new Date();

    let currentYear = now.getFullYear();
    let currentMonth = now.getMonth() + 1; // month
    let currentDate = now.getDate();
    

    //if days greater
    if(birth.getDate() > currentDate){
        currentDate = 31 + currentDate - birth.getDate();
        currentMonth = currentMonth - 1;
        console.log(currentMonth, currentDate);

        if(currentMonth < 0){
            currentMonth = 11;
            currentYear = currentYear - 1;
        }

    } else {
        currentDate = currentDate - birth.getDate();
    }

    //if month greater
    if(birth.getMonth() > currentMonth){
        currentMonth = currentMonth + 12;
        currentYear = currentYear - 1;
    }

    //years
    const years = currentYear - birth.getFullYear(); // years
    document.querySelector('.now-year').innerHTML = years;
    //month
    let month = currentMonth - birth.getMonth();
    document.querySelector('.now-month').innerHTML = month;

    //days
    const days = currentDate; // days
    console.log(currentDate)
    document.querySelector('.now-days').innerHTML = days;

    //
    const start = new Date(2003, 3, 9).getTime();
    const end = new Date().getTime();
    //Formula
    const distance = end - start;
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //hour
    document.querySelector('.now-hour').innerHTML = hours;
    //minutes
    document.querySelector('.now-minute').innerHTML = minutes;
    //seconds
    document.querySelector('.now-seconds').innerHTML = seconds;

}, 1000);

