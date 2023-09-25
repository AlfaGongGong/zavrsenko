
document.addEventListener('DOMContentLoaded', () => {
      const replaceImg = 'https://cdn.xxl.thumbs.canstockphoto.com/image-not-available-written-in-chalk-on-a-blackboard-stock-image_csp8317846.jpg';

      fetch('http://localhost:3000/free_games')
            .then(response => response.json())
            .then(freeGamesCards => {
                  const freeGamesCardsContainer = document.querySelector('.freeGamesCardsContainer');
                  freeGamesCards.forEach(card => {
                        // Create a product card element
                        const cardElement = document.createElement('div');
                        cardElement.classList.add('product-card', 'col-md-4');
                        cardElement.innerHTML = `
        <img src="${card.image}" alt="${replaceImg}" class="product-image"/>
        <h2 class="product-name">${card.title}</h2>
        <div class="card-info">
        <p class='product-description'>
        ${card.description}</p>
        <p class='product-publisher'>Publisher: ${card.publisher}</p>
        <p class='product-developer'>Developer: ${card.developer}</p>
        <p class='product-genre-info'>${card.genre}</p>
        </div>
        <a href="${card.free_to_play}" target="_blank" class="btn cta-btn">Play Now for Free</a>
      `;

                        // Append the product card element to the container   element    
                        freeGamesCardsContainer.appendChild(cardElement);

                  })

                        .catch(error => {
                              console.error('Error fetching free games cards:', error);
                        });
            });
});
