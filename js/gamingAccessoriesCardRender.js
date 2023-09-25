
document.addEventListener('DOMContentLoaded', () => {
      const replaceImg = 'https://cdn.xxl.thumbs.canstockphoto.com/image-not-available-written-in-chalk-on-a-blackboard-stock-image_csp8317846.jpg';

      fetch('http://localhost:3000/gaming_accessories')
            .then(response => response.json())
            .then(gamingAccessoriesCards => {
                  const accessoriesCardsContainer = document.querySelector('.accessoriesCardsContainer');
                  gamingAccessoriesCards.forEach(card => {
                        // Create a product card element
                        const cardElement = document.createElement('div');
                        cardElement.classList.add('product-card', 'col-md-4');
                        // Set the card content using the data from the fetch response
                        cardElement.innerHTML = `
          <img src="${card.product_image}" alt="${replaceImg}" class="product-image"/>
          <h2 class="product-name">${card.product_name}</h2>
          <div class="card-info">
          <p class='product-description-'>
          ${card.product_description}</p>
          <p class='product-genre-info'>${card.product_brand}</p>
          <p class='product-genre-info'>${card.product_type}</p>
          <p class="product-price-info">$${card.product_price}</p>
          <a href="../html/productDetails.html" class="btn cta-btn">More Info</a>
          </div>

        `;

                        // Append the card to the container
                        accessoriesCardsContainer.appendChild(cardElement);
                  });
            })
            .catch(error => {
                  console.error('Error fetching gaming accessories cards:', error);
            });
});

//start script when page loads
