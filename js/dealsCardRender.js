
document.addEventListener('DOMContentLoaded', () => {
      const replaceImg = 'https://cdn.xxl.thumbs.canstockphoto.com/image-not-available-written-in-chalk-on-a-blackboard-stock-image_csp8317846.jpg';

      fetch('http://localhost:3000/deals')
            .then(response => response.json())
            .then(dealsCards => {
                  const dealsCardsContainer = document.querySelector('.dealsCardsContainer');

                  // Loop through the product cards and append them to the container
                  dealsCards.forEach(card => {
                        // Create a product card element
                        const cardElement = document.createElement('div');
                        cardElement.classList.add('product-card', 'col-md-4');
                        cardElement.innerHTML = `
                <img src="${card.image}" alt="${replaceImg}" class="product-image"/> 
                <h2 class="product-name">${card.title}</h2>
       <div class="card-info">
        <p class='product-date-info'>Release Date: ${card.releaseDate}</p>
        <p class='product-description'>
        lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        <p class='product-rating-info'>Score: ${card.score}</p>
          <p class="product-price-normal">Regular price: ${card.normalPrice}</p>
          <p class="product-price-sale">Now: ${card.salePrice}</p>
        <a href="../html/productInfo.html" class="btn cta-btn">More Info</a>
        </div>

      `;

                        // Append the card to the container
                        dealsCardsContainer.appendChild(cardElement);
                  })

                        .catch(error => {
                              console.error('Error fetching deals cards:', error);
                        });
            });
});
