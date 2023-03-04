window.addEventListener('load', async () => {
    const response = await fetch('/api/v1/users/identity');
    const data = await response.json();
    const wrapper = document.querySelector('.wrapper');
    console.log(data)
    if (data.data) {
        const holder = document.querySelector('.loginButton');
        const profile = document.createElement('a');
        profile.classList.add('profile');
        profile.href = '/profile.html';
        profile.innerText = data.data.user;

        const logout = document.createElement('a');
        logout.classList.add('loginButton');
        logout.href = 'logout';
        logout.innerText = 'Sign Out';

        wrapper?.removeChild(holder)
        wrapper?.appendChild(profile);
        wrapper?.appendChild(logout);
    }
});