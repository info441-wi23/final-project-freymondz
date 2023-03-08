window.addEventListener('load', async () => {
    // Display show info
    await displayShowInfo();

    // Display form elements
    await displayForm();

    // Display Reviews
    await displayReviews();

    // Submit Review
    document.querySelector('form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const errorMessage = document.querySelector('#error-message');
        const rating = document.querySelector('input[name="rating"]:checked');
        if (!rating) {
            errorMessage.innerHTML = 'Please select a rating!';
            return;
        }

        await submitReview();
    });
});

async function displayShowInfo() {
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
        showInfo += `<h2>${title}</h2><img src="${imageUrl}">`;
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
        showInfo += `<h2>${show.title}</h2><img src="${show.img}">`;
    }
    showContainer.innerHTML = showInfo;
}

async function displayForm() {
    const formContainer = document.querySelector('.form-container');
    const form = `
    <form>
        <div class="season-episode">
            <label for="season">Season:</label>
            <input type="text" id="season" name="season">
            <label for="episode">Episode:</label>
            <input type="text" id="episode" name="episode">
        </div>
        <br>
        <div class="rating-container">
            <label for="rating">Rating:</label>
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
        </div>
        <label for="review">Review:</label>
        <textarea id="review" name="review" required></textarea>
        <br>
        <button id="submit-review" type="submit">Submit Review</button>
    </form>
    `;
    formContainer.innerHTML = form;
}

async function displayReviews() {
    const showId = new URLSearchParams(window.location.search).get("showId");
    const reviewContainer = document.querySelector('.review-container');
    const reviews = await fetch(`/api/v1/reviews/?showId=${showId}`);
    const reviewArea = await reviews.text();
    reviewContainer.innerHTML = reviewArea;
}

async function submitReview() {
    const showId = new URLSearchParams(window.location.search).get("showId");
    const season = document.querySelector('#season').value;
    const episode = document.querySelector('#episode').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const review = document.querySelector('#review').value;

    const reviewData = { showId, season, episode, rating, review };

    console.log(reviewData);

    const response = await fetch('/api/v1/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    });

    const formContainer = document.querySelector('.form-container');
    if (response.ok) {
        formContainer.innerHTML = '<div id="response"> <h2>Review submitted successfully!</h2><button id="reload-button">Reload Page</button> </div>';
        await updateReviewedShows();
    } else {
        formContainer.innerHTML = '<div id="response"> <h2>Failed to submit review. Please try again later.</h2><button id="reload-button">Reload Page</button> </div>';
    }
    document.getElementById('reload-button').addEventListener('click', () => {
        window.location.reload();
    });
}

async function updateReviewedShows() {
    const showId = new URLSearchParams(window.location.search).get("showId")
    const img = document.querySelector('.showDetail-container img').getAttribute('src');
    const title = document.querySelector('.showDetail-container h2').textContent;
    const showData = { showId, title, img };
    console.log(showData)
    await fetch('/api/v1/shows', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(showData)
    });
}