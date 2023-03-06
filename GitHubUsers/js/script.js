const API = 'https://api.github.com/users';
const message = document.querySelector('.message');

//! Fetch the Data
const fetchData = async (url, username) => {
    const res = await fetch(`${url}/${username}`);
    if (!res.ok) {
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
    const bannerInfo = document.createElement('div');
    bannerInfo.classList.add('result');
    bannerInfo.classList.add('flex');

    bannerInfo.innerHTML =
        `
        <div class="left-side">
            <div class="profile-img">
                <img src="https://images.unsplash.com/photo-1527960669566-f882ba85a4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXdlc29tZSUyMHBpY3xlbnwwfHwwfHw%3D&w=1000&q=80"
                    alt="">
            </div>
        </div>
        <div class="right-side">
            <!-- name info  -->
            <div class="flex justify-between">
                <div class="name">
                    <h1>Mutasim</h1>
                    <div class="username"><a href="#!">@mutasim77</a></div>
                </div>
                <div class="date">Joined 21 Dec 2021</div>
            </div>
            <!-- bio  -->
            <div class="bio">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, dolore.</div>
            <!-- banner followers  -->
            <div class="banner-followers flex justify-between">
                <div class="flex flex-column">
                    <div>Repository</div>
                    <span>8</span>
                </div>
                <div class="flex flex-column">
                    <div>Followers</div>
                    <span>3938</span>
                </div>
                <div class="flex flex-column">
                    <div>Following</div>
                    <span>10</span>
                </div>
            </div>
            <!-- links   -->
            <div class="flex justify-between">
                <div class="flex flex-column gap-5">
                    <div class="location"><i class="fa-solid fa-location-dot"></i> Not Availalable</div>
                    <div class="twitter"><i class="fa fa-twitter" aria-hidden="true"></i> Not Availalable</div>
                </div>
                <div class="flex flex-column gap-5">
                    <div class="company"><i class="fa-solid fa-building"></i> Not Availalable</div>
                    <div class="website"><i class="fa-solid fa-link"></i> Not Availalble</div>
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
