const API = 'https://api.github.com/users';
const message = document.querySelector('.message');
const spinner = document.querySelector('.spinner');

//! Fetch the Data
const fetchData = async (url, username) => {
    deleteResult();
    spinner.style.display = 'block';
    try {
        const res = await fetch(`${url}/${username}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        showMessage();
    } finally {
        spinner.style.display = 'none';
    }
}

//! Dark Mode
const buttonDark = document.querySelector('.dark-mode button');
buttonDark.addEventListener('click', () => {
    buttonDark.classList.toggle('dark');
    document.body.classList.toggle('dark');
});

//! Search Button
const buttonSearch = document.querySelector('[data-action="search"]');
buttonSearch.addEventListener('click', () => {
    const username = document.querySelector('[data-id="search"]').value.trim();
    if (!username) {
        //! SHOW MESSAGE
        console.log('ERROR');
        return;
    }
    fetchData(API, username).then(res => {
        deleteResult();
        showCards(res);
    })
});

//! Create Cards
function showCards(data) {
    if (!data) return;

    const { avatar_url, login, html_url, name, company, location, twitter_username, public_repos, followers, following, created_at, bio, blog } = data;

    const bannerInfo = document.createElement('div');
    bannerInfo.classList.add('result');
    bannerInfo.classList.add('flex');

    bannerInfo.innerHTML =
        `
        <div class="left-side">
            <div class="profile-img">
                <img src="${avatar_url}"
                    alt="${name}" data-id="profile-picture">
            </div>
        </div>
        <div class="right-side">
            <!-- name info  -->
            <div class="flex justify-between">
                <div class="name">
                    <h1>${name ? name : 'No name'}</h1>
                    <div class="username"><a href="${html_url}" target="_blank">@${login}</a></div>
                </div>
                <div class="date">Registered  ${formatDate((created_at.substring(0, 10)))}</div>
            </div>
            <!-- bio  -->
            <div class="bio">${bio ? bio : 'No bio...'}</div>
            <!-- banner followers  -->
            <div class="banner-followers flex justify-between">
                <div class="flex flex-column">
                    <div>Repository</div>
                    <span>${public_repos}</span>
                </div>
                <div class="flex flex-column">
                    <div>Followers</div>
                    <span>${followers}</span>
                </div>
                <div class="flex flex-column">
                    <div>Following</div>
                    <span>${following}</span>
                </div>
            </div>
            <!-- links   -->
            <div class="flex justify-between">
                <div class="flex flex-column gap-5">
                    <div class="location"><i class="fa-solid fa-location-dot"></i> ${notAvailable(location)}</div>
                    <div class="twitter"><i class="fa fa-twitter" aria-hidden="true"></i> ${notAvailable(twitter_username)}</div>
                </div>
                <div class="flex flex-column gap-5">
                    <div class="company"><i class="fa-solid fa-building"></i> ${notAvailable(company)}</div>
                    <div class="website"><i class="fa-solid fa-link"></i> ${notAvailable(blog)}</div>
                </div>
            </div>
        </div>
    `;
    hideMessage();
    document.querySelector('.main > .container').appendChild(bannerInfo);
}

//! convert YYYY-MM-DD to String 
function formatDate(dateString) {
    const dateObj = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return dateObj.toLocaleDateString('en-GB', options);
}

//! hide message
function hideMessage() {
    message.classList.add('hide');
}

//! show message
function showMessage() {
    message.classList.remove('hide');
    message.textContent = 'Sorry, we could not find any GitHub user with that username. Please try again with a different username.';
}

//! Delete Results each time
function deleteResult() {
    if (document.querySelector('.result')) {
        document.querySelector('.result').remove();
    }
}

//! Data not available
function notAvailable(str) {
    return str ? str : 'Not Available';
}

//! Modal window for picture
const modal = document.querySelector('.modal-window');

function openModal() {
    modal.classList.remove('hide');
}

function closeModal() {
    modal.classList.add('hide');
}

//! Open Modal by clicking on picture
document.addEventListener('click', (evt) => {
    const target = evt.target.dataset.id;
    if (target === 'profile-picture') {
        openModal();
        modal.classList.remove('hide');
    }
});

//! Close Modal by clicking on picture
modal.addEventListener('click', (evt) => {
    const target = evt.target.dataset.id;
    if (target !== 'modal-picture') {
        closeModal();
    }
});


//! MESSAGE FOR EMPTY USERNAME
//! FIXING NULLS TO NOT AVAILABLE FROM DATA