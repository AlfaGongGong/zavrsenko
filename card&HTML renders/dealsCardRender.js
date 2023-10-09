document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/deals")
    .then((response) => response.json())
    .then((dealsCards) => {
      const dealsCardsContainer = document.querySelector(
        ".dealsCardsContainer"
      );

      // Shuffle the array of dealsCards
      dealsCards = shuffle(dealsCards);

      // Loop through the first 6 dealsCards and append them to the container
      dealsCards.slice(0, 6).forEach((card) => {
        // Create a product card element
        const cardElement = document.createElement("div");
        cardElement.classList.add("product-card", "col-md-4");
        cardElement.innerHTML = `
    <img src="${card.image}" alt="${replaceImg}" class="product-image"/> 
    <h2 class="product-name">${card.title}</h2>
<div class="card-info">
<p class='product-date-info'>Release Date: ${card.releaseDate}</p>
<p class='product-description'>
lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
<p class='product-rating-info'>Score: ${card.score}</p>
<p class="product-price-normal">Regular price: ${card.normalPrice}</p>
<p class="product-price-sale">Now: ${card.salePrice}</p>
<a href="../html/productInfo.html" class="btn cta-btn">More Info</a>
</div>

`;

        // Append the card to the container
        dealsCardsContainer.appendChild(cardElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching deals cards:", error);
    });

  // Shuffle function to shuffle the array of dealsCards
  function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
});
