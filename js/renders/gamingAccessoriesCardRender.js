fetch(`${API_BASE}/gaming_gear`)
  .then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  })
  .then((gearCards) => {
    const container = document.getElementById("gearCardsContainer");
    if (!container) return;

    // Shuffle and show 6
    gearCards.sort(() => Math.random() - 0.5);
    const fallbackImg = "../images/dummy_we-will-fix-this-soon.png";

    for (let i = 0; i < Math.min(6, gearCards.length); i++) {
      const gear = gearCards[i];
      const card = document.createElement("div");
      card.classList.add("product-card", "col-md-4");

      card.innerHTML = `
        <img src="${gear.image}" alt="${gear.name}" class="product-image"
          onerror="this.src='${fallbackImg}'"/>
        <h2 class="product-name">${gear.name}</h2>
        <div class="product-info-container">
          <p class="product-info">${gear.description}</p>
          <p class="product-price-normal">${gear.price} KM</p>
          <div class="product-buttons">
            <a href="html/productDetails.html?id=${gear.id}&type=gear" class="btn more-info" title="More Info">
              <i class="fas fa-info-circle"></i>
            </a>
            <button class="btn cart-btn" onclick="addToCart({id:'g-${gear.id}',name:'${gear.name}',price:${gear.price},image:'${gear.image}',type:'gear'})" title="Add to cart">
              <i class="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);
    }
  })
  .catch((error) => {
    console.error("Error fetching gear cards:", error);
  });
