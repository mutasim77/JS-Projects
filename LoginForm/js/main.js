const dark = document.querySelector('#dark');
dark.onclick = () => {
    const body = document.querySelector('body');
    const text1 = document.querySelector('.label-1');
    const text2 = document.querySelector('.label-2');
    const login = document.querySelector('#username');
    const password = document.querySelector('#password');
    const text = document.querySelector('.login-text');

    if (body.style.background === 'rgb(0, 0, 0)') {
        body.style.background = '#fff'
        text1.style.color = "#000"
        text2.style.color = "#000"
        login.style.borderColor = "#000"
        password.style.borderColor = "#000"
        text.style.color = "#002469"
    } else {
        body.style.background = '#000'
        text1.style.color = "#fff"
        text2.style.color = "#fff"
        login.style.borderColor = "#fff"
        password.style.borderColor = "#fff"
        text.style.color = "#4fa7ff"

    }
}