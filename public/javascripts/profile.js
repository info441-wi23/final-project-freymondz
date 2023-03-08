async function uploadPicture(event) {
    event.preventDefault();
    const input = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append('picture', input.files[0]);
    const response = await fetch(`api/v1/users/picture`, {
        method: 'POST',
        body: formData
    });
    const responseJson = await response.json();
    if (responseJson.status === 'success') {
        alert('Picture uploaded successfully');
        window.location.reload();
    } else {
        alert('Failed to upload picture');
    }
}

window.addEventListener('load', async () => {
    const loginStatus = await fetch('/api/v1/users/identity');
    const loginStatusJson = await loginStatus.json();
    const data = await fetch(`api/v1/users/${window.location.search}`);
    const json = await data.json();
    const { username, name, picture } = json.data;

    const profile = document.querySelector('.profile-container');

    const title = document.createElement('h2');
    title.textContent = `Username: ${username}`;
    profile.appendChild(title);

    const nameElement = document.createElement('h2');
    nameElement.textContent = `Name: ${name}`;
    profile.appendChild(nameElement);

    const image = document.createElement('img');
    image.alt = 'Profile Picture';
    if (picture) {
        const objectURL = URL.createObjectURL(new Blob([picture]));
        image.src = objectURL;
        profile.appendChild(image);
    } else if (loginStatusJson.data) {
        const form = document.createElement('form');
        form.action = `/profile.html?${loginStatusJson.data.user}`;

        const upload = document.createElement('h2');
        upload.textContent = 'Upload a profile picture';
        const input = document.createElement('input');
        input.type = 'file';
        input.required = true;
        input.placeholder = 'Upload Profile Picture';

        const submit = document.createElement('button');
        submit.type = 'submit';
        submit.textContent = 'Upload';
        submit.addEventListener('click', uploadPicture);

        form.append(upload, input, submit);
        profile.append(form);
    } else {
        // placeholder url image
        image.src = 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png';
        profile.appendChild(image);
    }
});
