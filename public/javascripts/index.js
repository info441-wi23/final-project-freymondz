const searchButton = document.querySelector('.searchButton');
    searchButton?.addEventListener('click', async () => {
    await getShows();
});

async function getShows() {
    console.log("getting shows")
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

const showsContainer = document.querySelector('.shows-container');
showsContainer.addEventListener('click', async (event) => {
  const showItem = event.target.closest('.show-item');
  if (!showItem) return; // do nothing if click was not on a show item
  console.log(showItem)
  const showId = showItem.dataset.showId;
  await getShowDetail(showId);
  await getShowReivew(showId)
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

async function getShowReivew(showId) {
    const response = await fetch(`/api/v1/reviews/${showId}`);
    const data = await response.json();
    return data.map(info => {
        return `
        <div class="comment-box">
            <div>${info.username}</div>
            <div>${info.rating}</div>
            <div>${info.review} </div>
        </div>`
    }).join(" ");
    
}

async function addReview(){
    console.log("clicked")
    let review = document.getElementById("review").value
    let rating = document.getElementById("rating").value
    console.log(review, rating)

    await fetch("/api/v1/reviews", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            rating: rating,
            review: review
        })
    })
}
