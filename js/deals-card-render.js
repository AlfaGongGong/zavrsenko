const replaceImg = ('https://cdn.xxl.thumbs.canstockphoto.com/image-not-available-written-in-chalk-on-a-blackboard-stock-image_csp8317846.jpg');
// Make a GET request to fetch the JSON data from the server
fetch('http://localhost:3000/deals')
      .then(response => response.json())
      .then(dealsCards => {
            const dealsCardsContainer = document.querySelector('.dealsCardsContainer');

            // Loop through the product cards and append them to the container
            dealsCards.forEach(card => {
                  // Create a product card element
                  const cardElement = document.createElement('li');
                  cardElement.classList.add('product-card');

                  // Set the card content using the deal data
                  cardElement.innerHTML = `
                
        <img src="${card.image}" alt="${replaceImg}" class="product-image"/>
        <div class="card-body">

        <h2 class="product-name">${card.title}</h2>
       
        <p class='product-date-info'>Release Date: ${card.releaseDate}</p>
        <p class='product-description-'>
        lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        <p class='product-rating-info'>Score: ${card.score}</p>
        <div class="product-price-info">
          <p class="product-price-normal">Regular price: ${card.normalPrice}</p>
          <span class="product-price-sale">Now: ${card.salePrice}</span>
        </div>
        <a href="cart.html" class="cta-button"><i class="fas fa-shopping-cart"></i>Add to Cart</a>
      </div>
      
      `;

                  // Append the card to the container
                  dealsCardsContainer.appendChild(cardElement);
            });
      })
      .catch(error => {
            console.error('Error fetching deals cards:', error);
      });

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
fetch('http://localhost:3000/gaming_accessories')
      .then(response => response.json())
      .then(gamingAccessoriesCards => {
            const accessoriesCardsContainer = document.querySelector('.accessoriesCardsContainer');
            gamingAccessoriesCards.forEach(card => {
                  // Create a product card element
                  const cardElement = document.createElement('div');
                  cardElement.classList.add('product-card', 'col-md-4');              // Set the card content using the deal data
                  cardElement.innerHTML = `
        <img src="${card.product_image}" alt="${replaceImg}" class="product-image"/>
        <h2 class="product-name">${card.product_name}</h2>
        <p class='product-description-'>
        ${card.product_description}</p>
        <p class='product-genre-info'>${card.product_brand}</p>
        <p class='product-genre-info'>${card.product_type}</p>
        <p class="product-price-info">$${card.product_price}</p>
      <a href="cart.html" class="btn cta-button"><i class="fas fa-shopping-cart"></i>Add to Cart</a>
      `;

                  // Append the card to the container
                  accessoriesCardsContainer.appendChild(cardElement);

            });
      })
      .catch(error => {
            console.error('Error fetching gaming accessories cards:', error);

      })
