document.addEventListener('DOMContentLoaded', () => {
      const replaceImg = 'https://cdn.xxl.thumbs.canstockphoto.com/image-not-available-written-in-chalk-on-a-blackboard-stock-image_csp8317846.jpg';

      fetch('http://localhost:3000/upcoming_games')
            .then(response => response.json())
            .then(upcomingCards => {
                  const upcomingCardsContainer = document.querySelector('.upcomingCardsContainer');
                  upcomingCards.forEach(card => {
                        // Create a product card element
                        const cardElement = document.createElement('div');
                        cardElement.classList.add('product-card', 'col-md-4');
                        cardElement.innerHTML = `
        <img src="${card.image}" alt="${replaceImg}" class="product-image"/>
        <h2 class="product-name">${card.title}</h2>
        <p class='product-date-info'>Release Date: ${card.releaseDate}</p>
        <p class='product-description-'>
        lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        <p class='product-rating-info'>Score: ${card.score}</p>
        <a href="cart.html" class="cta-button"><i class="fas fa-shopping-cart"></i>Preorder Now</a>
      `;

                        // Append the card to the container
                        upcomingCardsContainer.appendChild(cardElement);

                  });
            })
            .catch(error => {
                  console.error('Error fetching upcoming games cards:', error);
            })
});