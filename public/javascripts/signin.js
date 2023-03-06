window.addEventListener('load', async () => {
    const response = await fetch('/api/v1/users/identity');
    const data = await response.json();
    const wrapper = document.querySelector('.wrapper');
    if (data.data) {
        const holder = document.querySelector('.loginButton');
        const profile = document.createElement('a');
        profile.classList.add('profile');
        profile.href = `profile.html?username=${data.data.user}`;
        profile.innerText = data.data.user;

        const logout = document.createElement('a');
        logout.classList.add('loginButton');
        logout.href = 'logout';
        logout.innerText = 'Sign Out';

        wrapper?.removeChild(holder);
        wrapper?.appendChild(profile);
        wrapper?.appendChild(logout);

        await fetch('/api/v1/users/login', {
            method: 'POST',
        });
    }
});