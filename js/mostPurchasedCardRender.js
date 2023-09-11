const replaceImg = ('https://cdn.xxl.thumbs.canstockphoto.com/image-not-available-written-in-chalk-on-a-blackboard-stock-image_csp8317846.jpg');
// Make a GET request to fetch the JSON data from the server

fetch('http://localhost:3000/games')
      .then(response => response.json())
      .then(gamesCards => {
            const gamesCardsContainer = document.querySelector('.mostPurchasedCardsContainer');
            gamesCards.forEach(card => {
                  // Create a product card element
                  const cardElement = document.createElement('div');
                  cardElement.classList.add('product-card', 'col-md-4');

                  // Set the card content using the deal data
                  cardElement.innerHTML = `
        <img src="${card.game_image}" alt="${replaceImg}" class="product-image"/>
        <h2 class="product-name">${card.game_name}</h2>

        <p class='product-description-'>
        lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        <p class='product-genre-info'>${card.game_genre}</p>
        <p class="product-price-info">${card.game_price}</p>
      <a href="cart.html" class="btn cta-button"><i class="fas fa-shopping-cart"></i>Add to Cart</a>
      `;

                  // Append the card to the container
                  gamesCardsContainer.appendChild(cardElement);
            });

      })
      .catch(error => {
            console.error('Error fetching games cards:', error);

      })