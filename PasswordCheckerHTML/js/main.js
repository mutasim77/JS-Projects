const showBtn = document.querySelector('.show-password');

showBtn.addEventListener('click', () => {
    const password = document.getElementById('password');
    password.getAttribute('type') ? password.removeAttribute('type') : password.setAttribute('type', 'password');
})