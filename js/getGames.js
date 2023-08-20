document.addEventListener('DOMContentLoaded', () => {
      const gameCardsContainer = document.getElementById('gameCards');

      fetch('http://localhost:3000/products_games')
            .then(response => response.json())
            .then(data => {
                  data.forEach(game => {
                        const card = createGameCard(game);
                        gameCardsContainer.appendChild(card);
                  });
            });
});

function createGameCard(game) {
      const card = document.createElement('div');
      card.classList.add('game-card');

      const image = document.createElement('img');
      image.classList.add('game-image');
      image.src = game.game_image;
      image.alt = game.game_name;
      card.appendChild(image);

      const name = document.createElement('div');
      name.classList.add('game-name');
      name.textContent = game.game_name;
      card.appendChild(name);

      const genre = document.createElement('div');
      genre.classList.add('game-genre');
      genre.textContent = game.game_genre;
      card.appendChild(genre);

      const price = document.createElement('div');
      price.classList.add('game-price');
      price.textContent = `$${game.game_price}`;
      card.appendChild(price);

      const description = document.createElement('div');
      description.classList.add('game-description');
      description.textContent = game.game_description;
      card.appendChild(description);

      return card;
}
