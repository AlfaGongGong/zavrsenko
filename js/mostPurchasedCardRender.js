// Make a GET request to fetch the JSON data from the server

fetch('http://localhost:3000/games')
      .then(response => response.json())
      .then(gamesCards => {
            const gamesCardsContainer = document.querySelector('.mostPurchasedCardsContainer');
            gamesCards.forEach(card => {
                  // Create a product card element
                  const cardElement = document.createElement('div');
                  cardElement.classList.add('product-card', 'col-md-4');

                  cardElement.innerHTML = `
        <img src="${card.game_image}" alt="${card.game_name}" class="product-image"/>
        <h2 class="product-name">${card.game_name}</h2>
        <div class="card-info">

        <p class='product-description-'>
        lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        <p class='product-genre-info'>${card.game_genre}</p>
        <p class="product-price-info">${card.game_price}</p>
      <a href="../html/productDetails.html" class="btn cta-btn">More Info</a>
      </div>
      `;

                  // Append the card to the container
                  gamesCardsContainer.appendChild(cardElement);
            });

      })
      .catch(error => {
            console.error('Error fetching games cards:', error);

      })