window.addEventListener('load', async () => {
    const showId = new URLSearchParams(window.location.search).get("showId");
    const response = await fetch(`/api/v1/shows/${showId}`);
    const data = await response.json();
    const show = data[0];
    const showContainer = document.querySelector('.showDetail-container');
    showContainer.innerHTML = `
          <h1>${show.title}</h1>
          <img src="${show.img}">
          <p>${show.description}</p>
      `;
});