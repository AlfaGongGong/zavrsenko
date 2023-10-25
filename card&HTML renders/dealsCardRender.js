fetch("http://localhost:8080/deals")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((dealsCards) => {
    console.log("Data received:", dealsCards);

    const dealsCardsContainer = document.getElementById("dealsCardsContainer");
    console.log("Container element:", dealsCardsContainer);

    // Shuffle the array of gamesCards
    dealsCards.sort(() => Math.random() - 0.5);

    // Render the first 6 cards
    for (let i = 0; i < 6; i++) {
      const deal = dealsCards[i];
      const cardElement = document.createElement("div");
      cardElement.classList.add("product-card", "col-md-4");
      const alt = "../images/dummy_we-will-fix-this-soon.png";

      cardElement.innerHTML = `
          <img src="${deal.image}" alt="${alt}" class="product-image"/> 
          <h2 class="product-name">${deal.title}</h2>
          <div class="card-info">
            <p class='product-date-info'>Release Date: ${deal.releaseDate}</p>
            <p class='product-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.  </p>
            <p class='product-rating-info'>Score: ${deal.score}</p>
            <p class="product-price-normal">Regular price: $${deal.normalPrice}</p>
            <p class="product-price-sale">Now: $${deal.salePrice}</p>
            <a href="html/productDetails.html?id=${deal.id}" class="btn cta-btn more-info" data-product-id="${deal.id}">
            More Info
          </a>
          </div>
        `;

      dealsCardsContainer.appendChild(cardElement);
      console.log("Card appended:", deal);
    }

    console.log("Cards appended to the container:", dealsCardsContainer);
  })
  .catch((error) => {
    console.error("Error fetching deals cards:", error);
  });
