async function getShows() {
    const response = await fetch('/api/v1/shows');
    const data = await response.json();
    for (const show of data) {
        const showPreview = new DOMParser().parseFromString(show, 'text/html').body;
        document.querySelector('.shows-container')?.appendChild(showPreview);
    }
}