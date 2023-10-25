fetch("http://localhost:8080/gaming_gear")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((gearCards) => {
    console.log("Data received:", gearCards);

    const gearCardsContainer = document.getElementById("gearCardsContainer");
    console.log("Container element:", gearCardsContainer);

    // Shuffle the array of gamesCards
    gearCards.sort(() => Math.random() - 0.5);

    // Render the first 6 cards
    for (let i = 0; i < 6; i++) {
      const gear = gearCards[i];
      const cardElement = document.createElement("div");
      cardElement.classList.add("product-card", "col-md-4");
      const alt = "../images/dummy_we-will-fix-this-soon.png";

      cardElement.innerHTML = `
        <img src="${gear.image}" alt="${alt}" class="product-image"/>
        <h2 class="product-name">${gear.name}</h2>
        <div class="product-info">
          <p class="product-description .product-description--two-rows">
          ${gear.description}
          </p>
          <p class="product-price-info">$${gear.price}</p>
          <a href="html/productDetails.html?id=${gear.id}" class="btn cta-btn more-info" data-product-id="${gear.id}">
            More Info
          </a>
          </div>
      `;
      gearCardsContainer.appendChild(cardElement);
      console.log("Card appended:", gear);
    }
    console.log("Cards appended to the container:", gearCardsContainer);
  })
  .catch((error) => {
    console.error("Error fetching gear cards:", error);
  });
