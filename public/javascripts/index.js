const searchButton = document.querySelector('.searchButton');
    searchButton?.addEventListener('click', async () => {
    await getShows();
});


async function getShows() {
    const keywordsInput = document.querySelector('#keywordsInput');
    const keywords = keywordsInput.value;
    console.log(keywords)

    const showsContainer = document.querySelector('.shows-container');
    showsContainer.innerHTML = '';

    if (keywords) {
        const response = await fetch(`/api/v1/shows/explore/?keywords=${keywords}`);
        const results = await response.json();
        const previews = results.map(show => show).join('');
        showsContainer.innerHTML = previews;
    } else {
        const response = await fetch('/api/v1/shows');
        const data = await response.json();
        const previews = data.map(show => show).join('');
        showsContainer.innerHTML = previews;
    }

    showsContainer.scrollIntoView({ behavior: 'smooth'});
}

  