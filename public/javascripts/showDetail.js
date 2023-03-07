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
        <label for="episode">Rating:</label>
        <div class="rating">
            <input type="radio" id="star5" name="rating" value="5" required>
            <label for="star5" title="5 stars">&#9733;</label>
            <input type="radio" id="star4" name="rating" value="4">
            <label for="star4" title="4 stars">&#9733;</label>
            <input type="radio" id="star3" name="rating" value="3">
            <label for="star3" title="3 stars">&#9733;</label>
            <input type="radio" id="star2" name="rating" value="2">
            <label for="star2" title="2 stars">&#9733;</label>
            <input type="radio" id="star1" name="rating" value="1">
            <label for="star1" title="1 star">&#9733;</label>
        </div>
        <label for="review">Review:</label>
        <textarea id="review" name="review" required></textarea>
        <br>
        <button id="submit-review" type="submit">Submit Review</button>
    </form>
    `;
    showInfo += form;

    showContainer.innerHTML = showInfo
});

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  const rating = document.querySelector('input[name="rating"]:checked');
  if (!rating) {
    event.preventDefault();
    alert('Please select a rating before submitting your review.');
  }
});


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