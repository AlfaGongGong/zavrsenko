// client.js

// Make a GET request to fetch the JSON data from the server
fetch('http://localhost:3000/deals')
      .then(response => response.json())
      .then(dealsCards => {
            const dealsCardsContainer = document.getElementById('dealsCardsContainer');

            // Loop through the product cards and append them to the container
            dealsCards.forEach(card => {
                  // Create a product card element
                  const cardElement = document.createElement('div');
                  cardElement.classList.add('product-card');

                  // Set the card content using the deal data
                  cardElement.innerHTML = `
        <img src="${card.image}" alt="${card.title}" class="product-image">
        <h2 class="product-name>${card.title}</h2>
        <p class='product-date-info'>Release Date: ${card.releaseDate}</p>
        <p class='product-score>Score: ${card.score}</p>
        <p class="price">
          <span class="product-price-sale">$${card.salePrice}</span>
          <span class="product-price-normal">$${card.normalPrice}</span>
        </p>
        <button class="buy-button"><i class="fas fa-shopping-cart"></i>Add to Cart</button>
      `;

                  // Append the card to the container
                  dealsCardsContainer.appendChild(cardElement);
            });
      })
      .catch(error => {
            console.error('Error fetching deals cards:', error);
      });