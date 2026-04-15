fetch(`${API_BASE}/api/upcoming`)
  .then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  })
  .then((upcomingCards) => {
    const container = document.getElementById("upcomingCardsContainer");
    if (!container) return;

    // Shuffle and show 6
    upcomingCards.sort(() => Math.random() - 0.5);
    const fallbackImg = "../images/dummy_we-will-fix-this-soon.png";

    for (let i = 0; i < Math.min(6, upcomingCards.length); i++) {
      const upcoming = upcomingCards[i];
      const card = document.createElement("div");
      card.classList.add("product-card", "col-md-4");

      const formattedDate = new Date(upcoming.firstReleaseDate).toLocaleDateString("en-GB", {
        day: "2-digit", month: "2-digit", year: "numeric",
      });

      card.innerHTML = `
        <img src="${upcoming.image}" alt="${upcoming.name}" class="product-image"
          onerror="this.src='${fallbackImg}'"/>
        <h2 class="product-name">${upcoming.name}</h2>
        <div class="product-info-container">
          <p class="product-dates">Release Date: ${formattedDate}</p>
          <div class="product-buttons">
            <a href="html/productDetails.html?id=${upcoming.id}" class="btn more-info" title="More Info">
              <i class="fas fa-info-circle"></i>
            </a>
            <button class="btn wishlist-btn" data-product="${upcoming.id}" title="Add to wishlist">
              <i class="fas fa-heart"></i>
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);
    }
  })
  .catch((error) => {
    console.error("Error fetching upcoming games:", error);
  });
