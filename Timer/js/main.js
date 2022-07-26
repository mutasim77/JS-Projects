let darkMode = document.querySelector('.dayNight');

darkMode.onclick = function () {
    darkMode.classList.toggle('active');
    document.querySelector('body').classList.toggle('dark');
};

let startBtn = document.querySelector('.start');
startBtn.onclick = function () {
    const millisecond = document.querySelector('.milliseconds');
    const seconds = document.querySelector('.seconds');
    const minutes = document.querySelector('.minutes');
    const hours = document.querySelector('.hours');

    let startTime = setInterval(function () {
        let timerMillisecond = parseFloat(millisecond.textContent);
        let timerSeconds = parseFloat(seconds.textContent);
        let timerMinutes = parseFloat(minutes.textContent);
        let timerHours = parseFloat(hours.textContent);

        if (timerMillisecond < 100) {
            if (timerMillisecond < 10) {
                millisecond.textContent = '0' + (timerMillisecond + 1);
            } else {
                millisecond.textContent = (timerMillisecond + 1);
            }
        } else if (timerMillisecond === 100) {
            timerSeconds++;
            if (timerSeconds < 10) {
                seconds.textContent = '0' + timerSeconds;
            } else {
                seconds.textContent = timerSeconds;
            }
            millisecond.textContent = 0;

            if (timerSeconds > 59) {
                timerMinutes++;
                if (timerMinutes < 10) {
                    minutes.textContent = '0' + timerMinutes;
                } else {
                    minutes.textContent = timerMinutes;
                }
                seconds.textContent = '00';
            }

            if (timerMinutes > 59) {
                timerHours++;
                if (timerHours < 10) {
                    hours.textContent = '0' + timerHours;
                } else {
                    hours.textContent = timerHours;
                }
                minutes.textContent = '00';
            }
        }
    }, 10);

    let stopBtn = document.querySelector('.stop');
    stopBtn.addEventListener('click', stop);
    function stop() {
        clearInterval(startTime)
    }

    let restartBtn = document.querySelector('.restart');
    restartBtn.addEventListener('click', restart);
    function restart() {
        clearInterval(startTime);
        document.querySelector('.hours').innerHTML = '00'
        document.querySelector('.minutes').innerHTML = '00'
        document.querySelector('.seconds').innerHTML = '00'
        document.querySelector('.milliseconds').innerHTML = '00'
    }
};

