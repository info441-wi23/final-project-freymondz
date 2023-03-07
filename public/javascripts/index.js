const searchButton = document.querySelector('.searchButton');
    searchButton?.addEventListener('click', async () => {
    await getShows();
});

async function getShows() {
    const keywordsInput = document.querySelector('#keywordsInput');
    const keywords = keywordsInput.value;

    const showsContainer = document.querySelector('.shows-container');
    showsContainer.innerHTML = '';

    let response;
    if (keywords) {
        response = await fetch(`/api/v1/shows/explore/?keywords=${keywords}`);
    } else {
        response = await fetch('/api/v1/shows');
    }

    const results = await response.json();
    const previews = results.map(show => show).join('');
    showsContainer.innerHTML = previews;

    showsContainer.scrollIntoView({ behavior: 'smooth'});
}