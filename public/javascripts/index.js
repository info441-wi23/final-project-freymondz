const searchButton = document.querySelector('.searchButton');
    searchButton.addEventListener('click', async () => {
    await getShows();
});


async function getShows() {
    const keywordsInput = document.querySelector('#keywordsInput');
    const keywords = keywordsInput.value;

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

const showsContainer = document.querySelector('.shows-container');
showsContainer.addEventListener('click', async (event) => {
  const showItem = event.target.closest('.show-item');
  if (!showItem) return; // do nothing if click was not on a show item
  console.log(showItem)
  const showId = showItem.dataset.showId;
  await getShowDetail(showId);
});

async function getShowDetail(showId) {
    const response = await fetch(`/api/v1/shows/${showId}`);
    const data = await response.json();
    const show = data[0];
    const showContainer = document.querySelector('.showDetail-container');
    showContainer.innerHTML = `
          <h1>${show.title}</h1>
          <img src="${show.img}">
      `;
  }
  