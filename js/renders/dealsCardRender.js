fetch(`${API_BASE}/deals`)
  .then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  })
  .then((dealsCards) => {
    const container = document.getElementById("dealsCardsContainer");
    if (!container) return;

    // Shuffle and show 6
    dealsCards.sort(() => Math.random() - 0.5);
    const fallbackImg = "../images/dummy_we-will-fix-this-soon.png";

    for (let i = 0; i < Math.min(6, dealsCards.length); i++) {
      const deal = dealsCards[i];
      const card = document.createElement("div");
      card.classList.add("product-card", "col-md-4");

      card.innerHTML = `
        <img src="${deal.image}" alt="${deal.title}" class="product-image"
          onerror="this.src='${fallbackImg}'"/>
        <h2 class="product-name">${deal.title}</h2>
        <div class="product-info-container">
          <p class="product-dates">Release Date: ${deal.releaseDate}</p>
          <p class="product-price-sale">${deal.normalPrice} KM</p>
          <p class="product-price-discount">Now: ${deal.salePrice} KM</p>
          <div class="product-buttons">
            <a href="html/productDetails.html?id=${deal.id}" class="btn more-info" data-product-id="${deal.id}" title="More Info">
              <i class="fas fa-info-circle"></i>
            </a>
            <button class="btn wishlist-btn" onclick="addToCart({id:'d-${deal.id}',name:'${deal.title}',price:${deal.salePrice},image:'${deal.image}',type:'game'})" title="Add to cart">
              <i class="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);
    }
  })
  .catch((error) => {
    console.error("Error fetching deals cards:", error);
  });
