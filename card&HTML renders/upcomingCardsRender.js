fetch("http://localhost:8080/api/upcoming")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((upcomingCards) => {
    console.log("Data received:", upcomingCards);

    const upcomingCardsContainer = document.getElementById(
      "upcomingCardsContainer"
    );
    console.log("Container element:", upcomingCardsContainer);

    // Shuffle the array of upcomingCards
    upcomingCards.sort(() => Math.random() - 0.5);

    // Render the first 6 cards
    for (let i = 0; i < 6; i++) {
      const upcoming = upcomingCards[i];
      const cardElement = document.createElement("div");
      cardElement.classList.add("product-card", "col-md-4");

      const date = new Date(upcoming.firstReleaseDate);
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const alt = "../images/dummy_we-will-fix-this-soon.png";

      cardElement.innerHTML = `
        <img src="${upcoming.image}" alt="${alt}" class="product-image"/>
            <h2 class="product-name">${upcoming.name}</h2>
            <div class="product-info">
         <p class='product-description'>Release Date: ${formattedDate}</p>
        <p class='product-description'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
         </p>
         <a href="html/productDetails.html?id=${upcoming.id}" class="btn cta-btn more-info" data-product-id="${upcoming.id}">
            More Info
          </a>
        </div>
                                                `;

      upcomingCardsContainer.appendChild(cardElement);
      console.log("Card appended:", upcoming);
    }
    console.log("Cards appended to the container:", upcomingCardsContainer);
  })
  .catch((error) => {
    console.error("Error fetching upcoming games cards:", error);
  });
