document.addEventListener('DOMContentLoaded', () => {
      const gameCardsContainer = document.getElementById('gameCards');

      fetch('/games')
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

      const content = document.createElement('div');
      content.classList.add('card-content');

      const image = document.createElement('img');
      image.src = game.game_image;
      image.alt = game.game_name;
      content.appendChild(image);

      const name = document.createElement('h3');
      name.textContent = game.game_name;
      content.appendChild(name);

      const description = document.createElement('p');
      description.classList.add('game-description');
      description.textContent = game.game_description;
      content.appendChild(description);

      const price = document.createElement('p');
      price.classList.add('game-price');
      price.textContent = `$${game.game_price}`;
      content.appendChild(price);

      const genre = document.createElement('p');
      genre.classList.add('game-genre');
      genre.textContent = game.game_genre;
      content.appendChild(genre);

      card.appendChild(content);

      return card;
}
