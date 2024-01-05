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

document.addEventListener("DOMContentLoaded", function () {
  // Get the game id from the query parameter
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const gameId = urlParams.get("data-product");
  console.log("Game id:", gameId);

  // Fetch the game details from the database
  if (gameId) {
    fetch(`http://localhost:8080/games/${gameId}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (gameData) {
        console.log("Game data:", gameData);
        const productDetailsContainer = document.querySelector(
          ".product-details-container"
        );

        const date = new Date(gameData.released);
        const formattedDate = date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        const alt = "../images/dummy_we-will-fix-this-soon.png";

        const gameDataGenre = gameData.genre;

        productDetailsContainer.innerHTML = `
        <div class="row">
          <div class="col-md-6 product-image-container">
          <img src="${
            gameData.background_image
          }" alt="${alt}" class="product-image">
          </div>
          <div class="col-md-6 product-info-container">
              <h1 class="product-name">${gameData.name}</h1>
              <p class="product-dates">Released: ${formattedDate}</p>
              <p class="product-genre">Genre: 
              <a href="html/genre.html?data-genre=${encodeURIComponent(
                gameDataGenre.toString()
              )}">${gameDataGenre}</a>
              </p>
              <p class="product-description">${getRandomLoremIpsumText()}</p>
              <p class="product-price-normal">Price: ${gameData.price} KM</p>
            </div>
             <div class="product-buttons col-md-12">
            <a href="html/myAcc.html?data-product=${encodeURIComponent(
              gameId.toString()
            )}" class="btn wishlist-btn" title="Add to your wishlist" id="wishlist-btn" data-product="${gameId}">
              <i class="fas fa-heart"></i> 
            </a>
            <a href="html/shoppingCart.html?data-product=${encodeURIComponent(
              gameId.toString()
            )}" class="btn cart-btn" title="Add to shopping cart" id="cart-btn" data-product="${gameId}">
              <i class="fas fa-shopping-cart"></i> 
            </a>
            </div>
          </div>
     `;
      })
      .catch(function (error) {
        console.error("Error fetching game details:", error);
        const productDetailsContainer = document.querySelector(
          ".product-details-container"
        );
        productDetailsContainer.innerHTML =
          "Error fetching game details. Please try again later.";
      });
  }
});
