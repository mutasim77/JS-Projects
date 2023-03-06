const API = 'https://api.github.com/users';
const message = document.querySelector('.message');

//! Fetch the Data
const fetchData = async (url, username) => {
    const res = await fetch(`${url}/${username}`);
    if (!res.ok) {
        showMessage();
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
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
        console.log('ERROR');
        return;
    }
    fetchData(API, username).then(res => {
        showCards(res);
    })
});

//! Create Cards
function showCards(data) {
    console.log(data);
    const { avatar_url, login, html_url, name, company, location, twitter_username, public_repos, followers, following, created_at, bio, blog } = data;
    const bannerInfo = document.createElement('div');
    bannerInfo.classList.add('result');
    bannerInfo.classList.add('flex');

    bannerInfo.innerHTML =
        `
        <div class="left-side">
            <div class="profile-img">
                <img src="${avatar_url}"
                    alt="${name}">
            </div>
        </div>
        <div class="right-side">
            <!-- name info  -->
            <div class="flex justify-between">
                <div class="name">
                    <h1>${name}</h1>
                    <div class="username"><a href="#!">@${login}</a></div>
                </div>
                <div class="date">Joined ${created_at}</div>
            </div>
            <!-- bio  -->
            <div class="bio">${bio}</div>
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
                    <div class="location"><i class="fa-solid fa-location-dot"></i> ${location}</div>
                    <div class="twitter"><i class="fa fa-twitter" aria-hidden="true"></i> ${twitter_username}</div>
                </div>
                <div class="flex flex-column gap-5">
                    <div class="company"><i class="fa-solid fa-building"></i> ${company}</div>
                    <div class="website"><i class="fa-solid fa-link"></i> ${blog}</div>
                </div>
            </div>
        </div>
    `;
    hideMessage();
    document.querySelector('.main > .container').appendChild(bannerInfo);
}



//! hide message
function hideMessage() {
    message.classList.add('hide');
}

//! show message
function showMessage() {
    message.classList.remove('hide');
}
