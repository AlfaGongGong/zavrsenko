document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:8080/upcoming")
    .then((response) => response.json())
    .then((upcomingCards) => {
      const upcomingCardsContainer = document.querySelector(
        ".upcomingCardsContainer"
      );
      upcomingCards.forEach((card) => {
        // Create a product card element
        const cardElement = document.createElement("div");
        cardElement.classList.add("product-card", "col-md-4");

        cardElement.innerHTML = `
              <img src="${card.image}" alt="${card.title}" class="product-image"/>
              <h2 class="product-name">${card.title}</h2>
              <div class="card-info">
                <p class='product-date-info'>Release Date: ${card.startDate} to ${card.endDate}</p>
                <p class='product-description-'>
                  ${card.description}
                </p>
                <p class='product-rating-info'>Score: ${card.score}</p>
                <a href="cart.html" class="btn cta-btn">Preorder Now</a>
              </div>
            `;

        // Append the card to the container
        upcomingCardsContainer.appendChild(cardElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching upcoming games cards:", error);
    });
});
