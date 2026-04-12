function getRandomLoremIpsumText() {
  const loremsIpsums = [
    (text1 =
      "Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium."),
    (text2 =
      "Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead."),
    (text3 =
      "Satoshi Nakamoto launched lots of decentralisation when Litecoin required many decentralised application, for Augur limited some public key behind lots of multi signature. Blockchain thought some robust smart contract in a algorithm! Since OmiseGo bought few double spend, Augur could be many algo-traded vaporware, but Decred data mining few trusted hard fork!"),
    (text4 =
      "Decred thought few robust consensus mechanism, and ERC20 token standard could be some peer-to-peer oracle! Although ERC721 token standard did lots of immutable proof of authority, Stellar chose many provably fair zero knowledge proof. Satoshi Nakamoto broadcast lots of centralised oracle, and although ERC721 token standard broadcast some peer-to-peer oracle, Bitcoin returns some trusted escrow!"),
    (text5 =
      "Dingy I'm tellin' you rhubaahb Bangah Jo-Jeezly got in a gaum Powrtland stove up dooryahd from away, paypuh bowee batrees owt Have a good one. hahd tellin' not knowin', p'dayduhs scrod You is sum wicked suhmart over t'. Lobstah buggin' bogan railed 'em gettin' ugly bluebries ayuhpawt Jo-Jeezly, front dooryahd huck naw got in a gaum bluebries."),
    (text6 =
      "Lookout flogging bilge rat main sheet bilge water nipper fluke to go on account heave down clap of thunder. Reef sails six pounders skysail code of conduct sloop cog Yellow Jack gunwalls grog blossom starboard. Swab black jack ahoy Brethren of the Coast schooner poop deck main sheet topmast furl marooned."),
  ];

  const randomIndex = Math.floor(Math.random() * loremsIpsums.length);
  return loremsIpsums[randomIndex];
}
fetch("http://localhost:8080/deals")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((dealsCards) => {
    console.log("Data received:", dealsCards);

    const dealsCardsContainer = document.getElementById("dealsCardsContainer");
    console.log("Container element:", dealsCardsContainer);

    // Shuffle the array of gamesCards
    dealsCards.sort(() => Math.random() - 0.5);

    // Render the first 6 cards
    for (let i = 0; i < 6; i++) {
      const deal = dealsCards[i];
      const cardElement = document.createElement("div");
      cardElement.classList.add("product-card", "col-md-4");
      const alt = "../images/dummy_we-will-fix-this-soon.png";

      cardElement.innerHTML = `
          <img src="${deal.image}" alt="${alt}" class="product-image"/>
          <h2 class="product-name">${deal.title}</h2>
          <div class="product-info-container">
            <p class='product-dates'>Release Date: ${deal.releaseDate}</p>
           <p class="product-info">${getRandomLoremIpsumText()}</p>

            <p class="product-price-sale"> ${deal.normalPrice} KM</p>
            <p class="product-price-discount">Now: ${deal.salePrice} KM</p>
            <div class="product-buttons">
            <a href="html/productDetails.html?id=${
              deal.id
            }" class="btn more-info" data-product-id="${
              deal.id
            }" title="More Info" id="more-info">
              <i class="fas fa-info-circle"></i> 
            </a>
 <a href="html/myAcc.html?id=${
   deal.id
 }" class="btn wishlist-btn" data-product-id="${
   deal.id
 }" title="Add to your wishlist" id="wishlist-btn">
                <i class="fas fa-heart"></i> 
            </a>
<a href="html/shoppingCart.html?id=${
        deal.id
      }" class="btn cart-btn" data-product-id="${
        deal.id
      }" title="Add to shopping cart" id="cart-btn">
                <i class="fas fa-shopping-cart"></i> 
            </a>
            </div>
          </div>
        `;

      dealsCardsContainer.appendChild(cardElement);
      console.log("Card appended:", deal);
    }

    console.log("Cards appended to the container:", dealsCardsContainer);
  })
  .catch((error) => {
    console.error("Error fetching deals cards:", error);
  });
