fetch("http://localhost:8080/gaming_gear")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((gearCards) => {
    console.log("Data received:", gearCards);

    const gearCardsContainer = document.getElementById("gearCardsContainer");
    console.log("Container element:", gearCardsContainer);

    // Shuffle the array of gamesCards
    gearCards.sort(() => Math.random() - 0.5);

    // Render the first 6 cards
    for (let i = 0; i < 6; i++) {
      const gear = gearCards[i];
      const cardElement = document.createElement("div");
      cardElement.classList.add("product-card", "col-md-4");
      const alt = "../images/dummy_we-will-fix-this-soon.png";

      cardElement.innerHTML = `
        <img src="${gear.image}" alt="${alt}" class="product-image"/>
        <h2 class="product-name">${gear.name}</h2>
        <div class="product-info-container">
           <p class="product-info">
          ${gear.description}
          </p>
          <p <p class="product-price-normal">${gear.price} KM</p>
         <div class="product-buttons">
            <a href="html/productDetails.html?id=${gear.id}" class="btn more-info" data-product-id="${gear.id}" title="More Info" id="more-info">
              <i class="fas fa-info-circle"></i> 
            </a>
 <a href="html/myAcc.html?id=${gear.id}" class="btn wishlist-btn" data-product-id="${gear.id}" title="Add to your wishlist" id="wishlist-btn">
                <i class="fas fa-heart"></i> 
            </a>
<a href="html/shoppingCart.html?id=${gear.id}" class="btn cart-btn" data-product-id="${gear.id}" title="Add to shopping cart" id="cart-btn">
                <i class="fas fa-shopping-cart"></i> 
            </a>
            </div>
          </div>
      `;
      gearCardsContainer.appendChild(cardElement);
      console.log("Card appended:", gear);
    }
    console.log("Cards appended to the container:", gearCardsContainer);
  })
  .catch((error) => {
    console.error("Error fetching gear cards:", error);
  });
