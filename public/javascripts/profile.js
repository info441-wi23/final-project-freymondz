window.addEventListener('load', async () => {
    const data = await fetch(`api/v1/users/${window.location.search}`);
    const json = await data.json();
    const { username, name, picture } = json.data;

    const profile = document.querySelector('.profile-container');

    const title = document.createElement('h2');
    title.textContent = username;
    profile.appendChild(title);

    const nameElement = document.createElement('h3');
    nameElement.textContent = name;
    profile.appendChild(nameElement);

    const image = document.createElement('img');
    image.src = picture;
    profile.appendChild(image);
});