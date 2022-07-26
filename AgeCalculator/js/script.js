let button = document.querySelector('.btn');

button.addEventListener('click', result);

function result() {
    let currentMonth = new Date().getMonth() + 1;
    let currentYear = new Date().getFullYear();
    let currentDay = new Date().getDate();

    let day = document.querySelector('#day').value;
    let month = document.querySelector('#month').value;
    let year = document.querySelector('#year').value;

    // if day greater than current day;
    if (day > currentDay) {
        currentDay = 31 + currentDay - day;
        currentMonth = currentMonth - 1;

        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear = currentYear - 1;
        }
    } else {
        currentDay = currentDay - day;
    }
    // if month greater than current month;
    if (month > currentMonth) {
        currentMonth = (12 + currentMonth);
        currentYear = currentYear - 1;
    }

    let resultYear = currentYear - year;
    let resultMonth = currentMonth - month;
    let resultDay = currentDay;

    if (day == '' || month == '' || year == '') {
        document.querySelector('.result').innerHTML = ''
    } else {
        document.querySelector('.result').innerHTML = 'Your age is ' + resultYear + ' years ' + resultMonth + ' months ' + resultDay + ' days';
    }
}