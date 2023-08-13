document.addEventListener('DOMContentLoaded', () => {
      const gameCardsContainer = document.getElementById('game-cards-container');

      fetch('/get_games')

            .then(response => response.json())
            .then(games => {
                  displayGames(games);
            })
            .catch(error => {
                  console.error('Error fetching games:', error);
            });

      function displayGames(games) {
            games.forEach(game => {
                  const gameCard = createGameCard(game);
                  gameCardsContainer.appendChild(gameCard);
            });
      }

      function createGameCard(game) {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';

            const cardContent = document.createElement('div');
            cardContent.className = 'card-content';

            const gameImage = document.createElement('img');
            gameImage.src = game.game_image;
            gameImage.alt = game.game_name;
            cardContent.appendChild(gameImage);

            const gameName = document.createElement('h3');
            gameName.textContent = game.game_name;
            cardContent.appendChild(gameName);

            const gameDescription = document.createElement('p');
            gameDescription.className = 'game-description';
            gameDescription.textContent = game.game_description;
            cardContent.appendChild(gameDescription);

            const gamePrice = document.createElement('p');
            gamePrice.className = 'game-price';
            gamePrice.textContent = '$' + game.game_price;
            cardContent.appendChild(gamePrice);

            const gameGenre = document.createElement('p');
            gameGenre.className = 'game-genre';
            gameGenre.textContent = game.game_genre;
            cardContent.appendChild(gameGenre);

            gameCard.appendChild(cardContent);

            return gameCard;
      }
});