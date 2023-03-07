window.addEventListener('load', async () => {
    const showContainer = document.querySelector('.showDetail-container');
    showContainer.innerHTML = '<h2>Loading...</h2>'

    const showId = new URLSearchParams(window.location.search).get("showId");
    let response = await fetch(`/api/v1/shows/${showId}`);
    let show = await response.json();
    show = show[0];

    let showInfo;
    if (!response || response.length == 0 || !show || show.length == 0) {
        response = await fetch(`/api/v1/shows/find/?showId=${showId}`);
        show = await response.json();
        const imageUrl = show.image?.url ?? 'https://via.placeholder.com/400x600.png?text=No+Image+Available';
        const title = show.title ?? 'Title not available';
        showInfo += `<img src="${imageUrl}"><h2>${title}</h2>`;
        if (show.year) {
        showInfo += `<p>Year: ${show.year}</p>`;
        }
        if (show.seriesStartYear) {
        showInfo += `<p>Series Start Year: ${show.seriesStartYear}</p>`;
        }
        if (show.seriesEndYear) {
        showInfo += `<p>Series End Year: ${show.seriesEndYear}</p>`;
        }
        if (show.numberOfEpisodes) {
        showInfo += `<p>Number of Episodes: ${show.numberOfEpisodes}</p>`;
        }
    } else {
        showInfo += `<img src="${show.img}"><h2>${show.title}</h2>`;
    }

    const form = `
    <form>
        <label for="season">Season:</label>
        <input type="text" id="season" name="season">
        <br>
        <label for="episode">Episode:</label>
        <input type="text" id="episode" name="episode">
        <br>
        <label for="review">Review:</label>
        <textarea id="review" name="review" required></textarea>
        <br>
        <button type="submit">Submit Review</button>
    </form>
    `;
    showInfo += form;

    showContainer.innerHTML = showInfo
});