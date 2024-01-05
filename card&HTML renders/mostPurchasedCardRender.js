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

fetch("http://localhost:8080/games")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((gamesCards) => {
    console.log("Data received:", gamesCards);

    const gamesCardsContainer = document.getElementById(
      "mostPurchasedCardsContainer"
    );
    console.log("Container element:", gamesCardsContainer);

    // Shuffle the array of gamesCards
    gamesCards.sort(() => Math.random() - 0.5);

    // Render the first 6 cards
    for (let i = 0; i < 6; i++) {
      const game = gamesCards[i];
      const cardElement = document.createElement("div");
      cardElement.classList.add("product-card", "col-md-4");

      const date = new Date(game.released);
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const alt = "../images/dummy_we-will-fix-this-soon.png";

      cardElement.innerHTML = `
        <img src="${game.background_image}" alt="${alt}" class="product-image"/>
        <h2 class="product-name">${game.name}</h2>
        <div class="product-info-container">
          <p class="product-dates">
            Released: ${formattedDate}
          </p>
          <p class="product-genre">Genre: ${game.genre}</p>
          <p class="product-info">${getRandomLoremIpsumText()}</p>
          <p class="product-price-normal">Price: ${game.price} KM</p>
        <div class="product-buttons" id="productButtons">
            <a href="html/productDetails.html?data-product=${encodeURIComponent(
              game.id.toString()
            )}" type="button" role="button" class="btn btn-primary more-info enabled" title="More Info" id="more-info" data-product="${
              game.id
            }">
              <i class="fas fa-info-circle"></i> 
            </a>
            <a href="html/myAcc.html?data-product=${encodeURIComponent(
              game.id.toString()
            )}" type="button" role="button" class="btn btn-primary wishlist-btn" title="Add to your wishlist" id="wishlist-btn" data-product="${
              game.id
            }">
              <i class="fas fa-heart"></i>
            </a>
            <a href="html/shoppingCart.html?data-product=${encodeURIComponent(
              game.id.toString()
            )}" type="button" role="button" class="btn btn-primary cart-btn" title="Add to shopping cart" id="cart-btn" data-product="${
              game.id
            }">
              <i class="fas fa-shopping-cart"></i>
            </a>
            
           
        </div>
      </div>
      `;

      // Append the card to the container
      gamesCardsContainer.appendChild(cardElement);
      console.log("Card appended:", game);
    }

    console.log("Cards appended to the container:", gamesCardsContainer);

    // Event listener for the "More Info" button on each card (redirects to productDetails.html with the game id as a query parameter)

    const moreInfoButtons = document.querySelectorAll(".more-info");
    console.log("More info buttons:", moreInfoButtons);

    moreInfoButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const gameId = event.currentTarget.dataset.product;
        console.log("Game id:", gameId);

        window.location.href = `html/productDetails.html?data-product=${encodeURIComponent(
          gameId.toString()
        )}`;
      });
    });

    // Event listener for the "Add to your wishlist" button on each card (redirects to myAcc.html with the game id as a query parameter)
    const wishlistButtons = document.querySelectorAll(".wishlist-btn");
    console.log("Wishlist buttons:", wishlistButtons);

    wishlistButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const gameId = event.currentTarget.dataset.product;
        console.log("Game id:", gameId);

        window.location.href = `html/myAcc.html?data-product=${encodeURIComponent(
          gameId.toString()
        )}`;
      });
    });

    // Event listener for the "Add to shopping cart" button on each card (redirects to shoppingCart.html with the game id as a query parameter)
    const cartButtons = document.querySelectorAll(".cart-btn");
    console.log("Cart buttons:", cartButtons);

    cartButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const gameId = event.currentTarget.dataset.product;
        console.log("Game id:", gameId);

        window.location.href = `html/shoppingCart.html?data-product=${encodeURIComponent(
          gameId.toString()
        )}`;
      });
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
