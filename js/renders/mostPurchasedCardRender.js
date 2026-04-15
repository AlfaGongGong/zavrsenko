fetch(`${API_BASE}/games`)
  .then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  })
  .then((gamesCards) => {
    const container = document.getElementById("mostPurchasedCardsContainer");
    if (!container) return;

    // Shuffle and show 6
    gamesCards.sort(() => Math.random() - 0.5);
    const fallbackImg = "../images/dummy_we-will-fix-this-soon.png";

    for (let i = 0; i < Math.min(6, gamesCards.length); i++) {
      const game = gamesCards[i];
      const card = document.createElement("div");
      card.classList.add("product-card", "col-md-4");

      const formattedDate = new Date(game.released).toLocaleDateString("en-GB", {
        day: "2-digit", month: "2-digit", year: "numeric",
      });

      card.innerHTML = `
        <img src="${game.background_image}" alt="${game.name}" class="product-image"
          onerror="this.src='${fallbackImg}'"/>
        <h2 class="product-name">${game.name}</h2>
        <div class="product-info-container">
          <p class="product-dates">Released: ${formattedDate}</p>
          <p class="product-genre">Genre: ${game.genre}</p>
          <p class="product-price-normal">Price: ${game.price} KM</p>
          <div class="product-buttons">
            <a href="html/productDetails.html?id=${game.id}" class="btn more-info" data-product="${game.id}" title="More Info">
              <i class="fas fa-info-circle"></i>
            </a>
            <button class="btn wishlist-btn" data-product="${game.id}" title="Add to wishlist">
              <i class="fas fa-heart"></i>
            </button>
            <button class="btn cart-btn" onclick="addToCart({id:${game.id},name:'${game.name}',price:${game.price},image:'${game.background_image}',type:'game'})" title="Add to cart">
              <i class="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);
    }
  })
  .catch((error) => {
    console.error("Error fetching games cards:", error);
  });
