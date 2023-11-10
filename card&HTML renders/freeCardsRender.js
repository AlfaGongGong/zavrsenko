fetch("http://localhost:8080/api/free_games")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((freeCards) => {
    console.log("Data received:", freeCards);
    const freeGamesCardContainer = document.getElementById(
      "freeGamesCardContainer"
    );
    console.log("Container element:", freeGamesCardContainer);

    // Shuffle the array of freeCards
    freeCards.sort(() => Math.random() - 0.5);

    // Render the cards as an ordered list with all elements in a row
    const cardList = document.createElement("ol");
    cardList.classList.add("row", "list-unstyled");
    freeGamesCardContainer.appendChild(cardList);

    for (let i = 0; i < 6; i++) {
      const free = freeCards[i];
      const cardElement = document.createElement("li");
      cardElement.classList.add("free-game-card", "col-md-12", "mb-5");
      const alt = "../images/dummy_we-will-fix-this-soon.png";

      cardElement.innerHTML = `
        <img src="${free.image}" alt="${alt}" class="product-image"/>
        <h2 class="product-name">${free.title}</h2>
        <p class='product-description'>${free.description}</p>
        <a href="${free.url}" class="btn cta-btn">Play Game</a>
      `;
      cardList.appendChild(cardElement);
      console.log("Card appended:", free);
    }
    console.log("Cards appended to the container:", freeGamesCardContainer);
  })
  .catch((error) => {
    console.error("Error fetching free games cards:", error);
  });
