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
        showsContainer.innerHTML = results.map(show => show).join('');
    } else {
        const response = await fetch('/api/v1/shows');
        const data = await response.json();
        for (const show of data) {
            const showPreview = new DOMParser().parseFromString(show, 'text/html').body;
            showsContainer?.appendChild(showPreview);
        }
    }

    showsContainer.scrollIntoView({ behavior: 'smooth' });
}
  