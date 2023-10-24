fetch("http://localhost:8080/api/free_games")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((freeCards) => {
    console.log("Data received:", freeCards);
    const freeGamesCardContainer = document.getElementById(
      "freeGamesCardContainer"
    );
    console.log("Container element:", freeGamesCardContainer);

    // Shuffle the array of freeCards
    freeCards.sort(() => Math.random() - 0.5);

    // Render the first 6 cards
    for (let i = 0; i < 6; i++) {
      const free = freeCards[i];
      const cardElement = document.createElement("div");

      cardElement.classList.add("free-game-card", "row", "mb-5");

      cardElement.innerHTML = `
      <div class="col-md-4">
      <img src="${free.image}" alt="${free.title}" class="product-image"/></div>
      <div class="col-md-8">
        <h2 class="product-name">${free.title}</h2>
        <div class="product-info">
          <p class='product-description'>${free.description}</p>
          <a href="${free.url}" class="btn cta-btn">Play Game</a>
        </div>
      </div>
    `;
      freeGamesCardContainer.appendChild(cardElement);
      console.log("Card appended:", free);
    }
    console.log("Cards appended to the container:", freeGamesCardContainer);
  })
  .catch((error) => {
    console.error("Error fetching free games cards:", error);
  });
