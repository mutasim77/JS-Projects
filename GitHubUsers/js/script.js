//! Dark Mode
const buttonDark = document.querySelector('.dark-mode button');
buttonDark.addEventListener('click', () => {
    buttonDark.classList.toggle('dark');
    document.body.classList.toggle('dark');
});


//! Search Button
const buttonSearch = document.querySelector('[data-action="search"]');
buttonSearch.addEventListener('click', () => {
    console.log("Hello");
});
