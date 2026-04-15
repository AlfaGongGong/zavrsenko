fetch(`${API_BASE}/api/free_games`)
  .then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  })
  .then((freeCards) => {
    const container = document.getElementById("freeGamesCardContainer");
    if (!container) return;

    // Shuffle and show 6
    freeCards.sort(() => Math.random() - 0.5);
    const fallbackImg = "../images/dummy_we-will-fix-this-soon.png";

    const cardList = document.createElement("ol");
    cardList.classList.add("row", "list-unstyled");
    container.appendChild(cardList);

    for (let i = 0; i < Math.min(6, freeCards.length); i++) {
      const free = freeCards[i];
      const card = document.createElement("li");
      card.classList.add("free-game-card", "col-md-12", "mb-5");

      card.innerHTML = `
        <img src="${free.image}" alt="${free.title}" class="product-image"
          onerror="this.src='${fallbackImg}'"/>
        <h2 class="product-name">${free.title}</h2>
        <div class="product-info-container">
          <p class="product-description">${free.description}</p>
          <a href="${free.url}" class="btn cta-btn" target="_blank" rel="noopener">Play for Free</a>
        </div>
      `;

      cardList.appendChild(card);
    }
  })
  .catch((error) => {
    console.error("Error fetching free games cards:", error);
  });
