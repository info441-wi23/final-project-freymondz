window.addEventListener('load', async () => {
    const response = await fetch('/api/v1/users/identity');
    const data = await response.json();
    const holder = document.querySelector('.loginButton');
    console.log(data)
    if (data.data) {
        const logout = document.createElement('a');
        logout.classList.add('loginButton');
        logout.href = 'logout';
        logout.innerText = 'Sign Out';

        holder?.replaceWith(logout);
    }
});