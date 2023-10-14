document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/free_games")
    .then((response) => response.json())
    .then((freeGames) => {
      const freeGamesContainer = document.querySelector(".freeGamesContainer");

      freeGames.forEach((game) => {
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card", "col-md-4");
        gameCard.innerHTML = `
              <img src="${game.image}" alt="${game.title}" class="game-image"/> 
              <h2 class="game-title">${game.title}</h2>
              <div class="card-info">
                <p class='game-description'>${game.description}</p>
                <a href="/gameInfo/${game.id}" class="btn cta-btn">More Info</a>
              </div>
            `;

        freeGamesContainer.appendChild(gameCard);
      });
    })
    .catch((error) => {
      console.error("Error fetching free games:", error);
    });
});
