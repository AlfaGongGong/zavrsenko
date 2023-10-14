document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/deals")
    .then((response) => response.json())
    .then((deals) => {
      const dealsCardsContainer = document.querySelector(
        ".dealsCardsContainer"
      );

      deals.slice(0, 6).forEach((deal) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("product-card", "col-md-4");
        cardElement.innerHTML = `
          <img src="${deal.image}" alt="${deal.title}" class="product-image"/> 
          <h2 class="product-name">${deal.title}</h2>
          <div class="card-info">
            <p class='product-date-info'>Release Date: ${deal.releaseDate}</p>
            <p class='product-description'>${deal.description}</p>
            <p class='product-rating-info'>Score: ${deal.score}</p>
            <p class="product-price-normal">Regular price: $${deal.normalPrice}</p>
            <p class="product-price-sale">Now: $${deal.salePrice}</p>
            <a href="/productInfo/${deal.id}" class="btn cta-btn">More Info</a>
          </div>
        `;

        dealsCardsContainer.appendChild(cardElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching deals cards:", error);
    });
});
