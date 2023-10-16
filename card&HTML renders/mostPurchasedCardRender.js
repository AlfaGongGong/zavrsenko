fetch("http://localhost:8080/games")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((gamesCards) => {
    console.log("Data received:", gamesCards);

    const gamesCardsContainer = document.getElementById(
      "mostPurchasedCardsContainer"
    );
    console.log("Container element:", gamesCardsContainer);

    // Shuffle the array of gamesCards
    gamesCards.sort(() => Math.random() - 0.5);

    // Render the first 6 cards
    for (let i = 0; i < 6; i++) {
      const game = gamesCards[i];
      const cardElement = document.createElement("div");
      cardElement.classList.add("product-card", "col-md-4");

      cardElement.innerHTML = `
        <img src="${game.background_image}" alt="${game.name}" class="product-image"/>
        <h2 class="product-name">${game.name}</h2>
        <div class="product-info">
          <p class="product-description">
            Released: ${game.platform_released_at}
          </p>
          <p class="product-genre-info">Genre: ${game.genre}</p>
          <p class="product-price-info">Price: ${game.price} KM</p>
          <a href="html/productDetails.html?id=${game.id}" class="btn cta-btn more-info" data-product-id="${game.id}">
            More Info
          </a>
        </div>
      `;

      // Append the card to the container
      gamesCardsContainer.appendChild(cardElement);
      console.log("Card appended:", game);
    }

    console.log("Cards appended to the container:", gamesCardsContainer);
  })
  .catch((error) => {
    console.error("Error fetching games cards:", error);
  });
