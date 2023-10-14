// Make a GET request to fetch the JSON data from the server
fetch("http://localhost:3000/games")
  .then((response) => response.json())
  .then((gamesCards) => {
    const gamesCardsContainer = document.querySelector(
      ".mostPurchasedCardsContainer"
    );
    gamesCards.forEach((card) => {
      // Create a product card element
      const cardElement = document.createElement("div");
      cardElement.classList.add("product-card", "col-md-4");

      cardElement.innerHTML = `
        <img src="${card.background_image}" alt="${card.name}" class="product-image"/>
        <h2 class="product-name">${card.title}</h2>
        <div class="card-info">
          <p class="product-description">
            ${card.description}
          </p>
          <p class="product-genre-info">${card.genre}</p>
          <p class="product-price-info">${card.price} KM</p>
          <a href="html/productDetails.html?id=${card.id}" class="btn cta-btn more-info" data-product-id="${card.id}">
            More Info
          </a>
        </div>
      `;

      // Append the card to the container
      gamesCardsContainer.appendChild(cardElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching games cards:", error);
  });
