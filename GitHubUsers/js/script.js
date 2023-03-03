const API = 'https://api.github.com/users';

//! Fetch the Data
const fetchData = async (url, username) => {
    const res = await fetch(`${url}/${username}`);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
}

console.log(fetchData(API, 'mutasim77'));

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
