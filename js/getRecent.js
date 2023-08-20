fetch('http://localhost:3000/products_games')
      .then(response => response.json())
      .then(data => {
            const recentCardsContainer = document.querySelector('.recent-cards-container');

            // Loop through the retrieved game data
            data.forEach(game => {
                  const recentProductCard = document.createElement('div');
                  recentProductCard.classList.add('recent-product-card');

                  // Create and append the game image
                  const recentProductImage = document.createElement('div');
                  recentProductImage.classList.add('recent-product-image');
                  const img = document.createElement('img');
                  img.src = game.game_image;
                  img.alt = game.game_name;
                  recentProductImage.appendChild(img);
                  recentProductCard.appendChild(recentProductImage);

                  // Create and append the recent product details
                  const recentProductDetails = document.createElement('div');
                  recentProductDetails.classList.add('recent-product-details');
                  recentProductDetails.innerHTML = `
        <h2 class="recent-title">${game.game_name}</h2>
        <p class="recent-description">${game.game_description}</p>
        <div class="recent-price">$${game.game_price}</div>
        <button class="recent-buy-button">Add to Cart</button>
      `;
                  recentProductCard.appendChild(recentProductDetails);

                  // Append the recent product card to the container
                  recentCardsContainer.appendChild(recentProductCard);
            });
      })
      .catch(error => {
            console.error('Error fetching game data:', error);
      });