// Make a GET request to fetch the JSON data from the server

fetch('http://localhost:3000/games')
      .then(response => response.json())
      .then(gamesCards => {
            const gamesCardsContainer = document.querySelector('.mostPurchasedCardsContainer');
            gamesCards.forEach(card => {
                  // Create a product card element
                  const cardElement = document.createElement('div');
                  cardElement.classList.add('product-card', 'col-md-4');

                  cardElement.innerHTML = `
        <img src="${card.background_image}" alt="${card.game_name}" class="product-image"/>
        <h2 class="product-name">${card.name}</h2>
        <div class="card-info">

        <p class='product-description-'>
        Pokem ipsum dolor sit amet Porygon-Z Mewtwo Strikes Back to train them is my cause Nuzleaf Solosis bicycle. Charmeleon Lombre Cresselia Unown Gulpin Stunfisk Claydol. Flying Forretress Raikou Haxorus Diglett Lucario Mime Jr. Glitch City Mime Jr Nurse Joy Vileplume Staravia Blastoise Dig. Quis nostrud exercitation ullamco laboris nisi Vanillite Golem Kingler Strength Zigzagoon Marshtomp.

Red Ariados Igglybuff consectetur adipisicing elit Horsea Kanto Yanma. Thundershock Charmander Seedot Rayquaza Bulbasaur to protect the world from devastation Purugly. Flying et dolore magna aliqua Excadrill Beheeyem Strength Celadon Department Store Celadon City. Rainbow Badge Eelektrik Electrode Nidoran Pokemon Heroes Ledian Ash Ketchum. The Power Of One Misty Elekid Blastoise Lombre Dusknoir Bubble.

Lavender Town Uxie Volcarona Mint Berry Scratch Woobat Vigoroth. Sed do eiusmod tempor incididunt Wormadam Persian Rainbow Badge Brock we're blasting off again Gible. Leech Seed Machamp Hitmonchan bicycle Lucario I like shorts Groudon. Thunder Badge Shuckle Loudred Watchog Simipour Swinub Panpour. Water Poliwag Bronzor Chinchou Machop Cerulean City Skorupi.

Excepteur sint occaecat cupidatat non proident Mewtwo Dodrio Charmeleon Hydreigon Herdier Fighting. Hive Badge Venipede Xatu Relicanth Unown Parasect Drilbur. Mineral Badge Starly Larvitar like no one ever was Mawile Boldore Badge. Pokemon 4Ever Spoink Kanto Charmander Liepard Soul Badge Body Slam. Squirtle MysteryBerry Vespiquen Combusken Water Gun Ledyba Pokemon.

Dig Ice Yanmega Beldum Foongus Normal Burnt Berry. Mirror Move Maractus Boldore oh, you're my best friend Flygon Houndoom Cleffa. Rock Silph Scope Castform Muk Mew Sealeo Minun. Vermilion City Phanpy Barboach Chikorita Krokorok we're blasting off again Gabite. Wartortle Reuniclus Pidgey Roserade Town Map Hoppip Wooper.
  </p>
        <p class='product-genre-info'>${card.genre}</p>
        <p class="product-price-info">${card.price} KM</p>
        <a href="html/productDetails.html?id=${card.product_id}" class="btn cta-btn more-info" data-product-id="${card.product_id}"
        >More Info</a>
      </div>
      `;

                  // Append the card to the container
                  gamesCardsContainer.appendChild(cardElement);
            });

      })
      .catch(error => {
            console.error('Error fetching games cards:', error);

      })