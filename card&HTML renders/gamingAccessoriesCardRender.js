

document.addEventListener("DOMContentLoaded", () => {
  

  fetch("http://localhost:8080/gaming_gear")
    .then((response) => response.json())
    .then((gamingAccessoriesCards) => {
      const accessoriesCardsContainer = document.querySelector(
        ".accessoriesCardsContainer"
      );
      gamingAccessoriesCards.forEach((card) => {
        // Create a product card element
        const cardElement = document.createElement("div");
        cardElement.classList.add("product-card", "col-md-4");
        // Set the card content using the data from the fetch response
        cardElement.innerHTML = `
              <img src="${card.image}" alt="${card.name}" class="product-image"/>
              <h2 class="product-name">${card.name}</h2>
              <div class="card-info">
                <p class='product-description-'>
                  ${card.description}
                </p>
                <p class="product-price-info">$${card.price}</p>
                <a href="html/productDetails.html?id=${card.id}" class="btn cta-btn">More Info</a>
              </div>
            `;

        // Append the card to the container
        accessoriesCardsContainer.appendChild(cardElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching gaming accessories cards:", error);
    });
});
