# Title: GG Gamestore Web App Documentation

## Table of Contents

- [Introduction](#introduction)
  - [Description](#description)
  - [Key Features](#KeyFeatures)
  - [Technologies Used](#technologies-used)
  - [License](#License)
  - [Authors](#Authors)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Frontend Documentation](#frontend-documentation)
  - [Client-Side Fetching](#client-side-fetching)
    - [Deals Section](#deals-section)
    - [Free Games Section](#free-games-section)
    - [Most Purchased Games Section](#most-purchased-games-section)
    - [Gaming Gear Section](#gaming-gear-section)
    - [Upcoming Games Section](#upcoming-games-section)
  - [User Interface Components](#user-interface-components)
    - [Admin Login Form](#admin-login-form)
    - [Admin Dashboard](#admin-dashboard)
    - [Shopping Cart](#shopping-cart)
    - [Checkout](#checkout)
    - [Product Info Pages](#product-info-pages)
    - [All Games Page](#all-games-page)
    - [All Accessories Page](#all-accessories-page)
  - [Error Handling](#error-handling)
  - [Middleware](#middleware)
  - [Routes](#routes)
  - [IT Diagrams](#it-diagrams)
  - [Sitemap](#sitemap)
- [Backend Documentation](#backend-documentation)
  - [Server Details](#server-details)
  - [Permissions Policy](#permissions-policy)
  - [Database Architecture](#database-architecture)
  - [User Paths](#user-paths)
  - [Sitemap](#sitemap)
- [Conclusion](#conclusion)

## Introduction

#### Description:

GG Gamestore Web App is a comprehensive online platform that offers PC games and gaming accessories to users. It features client-side fetching, user-friendly interfaces, secure login, and a wide range of gaming products. Whether you're a gamer looking for the latest releases or an admin managing content, GameShop provides a seamless experience.

#### Key Features:

- Extensive game catalog with detailed product information. - Deals, free games, and upcoming releases sections.
- User-friendly shopping cart and secure checkout process.
- Admin dashboard for content management and user monitoring.
- Robust error handling and security measures.

This documentation provides an overview of the GameShop web app, including server details, database architecture with diagram, user paths with diagram, and sitemap diagram.

#### Technologies Used:

JavaScript, HTML, SCSS, CSS, AnimateCSS, Bootstrap, Google Fonts, Font Awsome, JQuery, Node.JS, Express.JS, MySQL Server and Database on localhost, APIs from RAWG, FreeShark, RapidApi and Amazon Scraper, bcrypt, body-parser, express-session and cors.

#### License:

[Open Source]

#### Authors:

[AlfaGongGong](https://alfagonggong.github.io/Portfolio/)

## Prerequisites

- A Node.js environment with npm.
- A MySQL database with the name "gg_database" running locally.
- Required npm packages installed (express, mysql2, cors, bcrypt, body-parser, express-session).

## Getting Started

Follow these steps to get started with the GameShop web app:

1. Clone this repository to your local machine.
2. Install the required npm packages using

```bash
npm install
```

3. Configure your MySQL database settings in the code.
4. Start the server using

```bash
npm start
```

## Frontend Documentation

### Client-Side Fetching

The GG PC Games and Gaming Accessories web app uses JavaScript for client-side fetching and dynamic content generation. Below are JavaScript code snippets demonstrating various functionalities:

#### Deals Section

```javascript
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/deals")
    .then((response) => response.json())
    .then((dealsCards) => {
      const dealsCardsContainer = document.querySelector(
        ".dealsCardsContainer",
      );

      // Loop through the product cards and append them to the container
      dealsCards
        .forEach((card) => {
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

          dealsCardsContainer.appendChild(cardElement);
        })

        .catch((error) => {
          console.error("Error fetching deals cards:", error);
        });
    });
});
```

#### Free Games Section

```javascript
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/free_games")
    .then((response) => response.json())
    .then((freeGamesCards) => {
      const freeGamesCardsContainer = document.querySelector(
        ".freeGamesCardsContainer",
      );
      freeGamesCards
        .forEach((card) => {
          // Create a product card element
          const cardElement = document.createElement("div");
          cardElement.classList.add("product-card", "col-md-4");
          cardElement.innerHTML = `
        <img src="${card.image}" alt="${card.title}" class="product-image"/>
        <h2 class="product-name">${card.title}</h2>
        <div class="card-info">
        <p class='product-description'>
        ${card.description}</p>
        <p class='product-publisher'>Publisher: ${card.publisher}</p>
        <p class='product-developer'>Developer: ${card.developer}</p>
        <p class='product-genre-info'>${card.genre}</p>
        </div>
        <a href="${card.free_to_play}" target="_blank" class="btn cta-btn">Play Now for Free</a>
      `;

          freeGamesCardsContainer.appendChild(cardElement);
        })

        .catch((error) => {
          console.error("Error fetching free games cards:", error);
        });
    });
});
```

#### Most Purchased Games Section

```javascript
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/games")
    .then((response) => response.json())
    .then((gamesCards) => {
      const gamesCardsContainer = document.querySelector(
        ".mostPurchasedCardsContainer",
      );
      gamesCards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("product-card", "col-md-4");

        cardElement.innerHTML = `
        <img src="${card.background_image}" alt="${card.game_name}" class="product-image"/>
        <h2 class="product-name">${card.name}</h2>
        <div class="card-info">

        <p class='product-description-'>
        Pokem ipsum dolor sit amet Porygon-Z Mewtwo Strikes Back to train them is my cause Nuzleaf Solosis bicycle. Charmeleon Lombre Cresselia Unown Gulpin Stunfisk Claydol. Flying Forretress Raikou Haxorus Diglett Lucario Mime Jr. Glitch City Mime Jr Nurse Joy Vileplume Staravia Blastoise Dig. Quis nostrud exercitation ullamco laboris nisi Vanillite Golem Kingler Strength Zigzagoon Marshtomp.</p>
        <p class='product-genre-info'>${card.genre}</p>
        <p class="product-price-info">${card.price} KM</p>
        <a href="html/productDetails.html?id=${card.product_id}" class="btn cta-btn more-info" data-product-id="${card.product_id}"
        >More Info</a>
      </div>
      `;

        gamesCardsContainer.appendChild(cardElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching games cards:", error);
    });
});
```

#### Gaming Gear Section

```javascript
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/gaming_gear")
    .then((response) => response.json())
    .then((gamingAccessoriesCards) => {
      const accessoriesCardsContainer = document.querySelector(
        ".accessoriesCardsContainer",
      );
      gamingAccessoriesCards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("product-card", "col-md-4");
        cardElement.innerHTML = `
          <img src="${card.image}" alt="${card.name}" class="product-image"/>
          <h2 class="product-name">${card.name}</h2>
          <div class="card-info">
          <p class='product-description-'>
          ${card.description}</p>
          <p class="product-price-info">$${card.price}</p>
          <a href="../html/productDetails.html" class="btn cta-btn">More Info</a>
          </div>

        `;
        accessoriesCardsContainer.appendChild(cardElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching gaming accessories cards:", error);
    });
});
```

#### Upcoming Games Section

```javascript
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/upcoming")
    .then((response) => response.json())
    .then((upcomingCards) => {
      const upcomingCardsContainer = document.querySelector(
        ".upcomingCardsContainer",
      );
      upcomingCards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("product-card", "col-md-4");
        cardElement.innerHTML = `
        <img src="${card.image}" alt="${card.title}" class="product-image"/>
        <h2 class="product-name">${card.title}</h2>
        <div class="card-info">
        <p class='product-date-info'>Release Date: ${card.releaseDate}</p>
        <p class='product-description-'>
        Pokem ipsum dolor sit amet Porygon-Z Mewtwo Strikes Back to train them is my cause Nuzleaf Solosis bicycle. Charmeleon Lombre Cresselia Unown Gulpin Stunfisk Claydol. Flying Forretress Raikou Haxorus Diglett Lucario Mime Jr. Glitch City Mime Jr Nurse Joy Vileplume Staravia Blastoise Dig. Quis nostrud exercitation ullamco laboris nisi Vanillite Golem Kingler Strength Zigzagoon Marshtomp. 
        </p>

        <p class='product-rating-info'>Score: ${card.score}</p>
        <a href="cart.html" class="btn cta-btn">Preorder Now</a>
        </div>
      `;
        upcomingCardsContainer.appendChild(cardElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching upcoming games cards:", error);
    });
});
```

These code snippets demonstrate how to fetch data from the server and dynamically generate product cards in the respective HTML sections.

### User Interface Components

The user interface includes the following components:

#### Admin Login Form

The login form allows users to login to the admin dashboard. It includes:

- Username
- Password
- Login button

#### Admin Dashboard

The admin dashboard is a secure section for administrators to manage content, users, and monitor user activity. Administrators can:

- Add, edit, or remove game listings.
- Manage user accounts and permissions.
- Monitor user activity and data.

#### Shopping Cart

The shopping cart allows users to add products (games or gaming gear) to their cart, review cart contents, update quantities, and proceed to checkout.

#### Checkout

The checkout process enables users to complete their purchases securely. It includes:

- Entering shipping and billing information.
- Selecting payment methods.
- Confirming and placing orders.

#### Product Info Pages

Individual product pages provide detailed information about games and gaming gear. Users can view product descriptions, images, pricing, and related information.

#### All Games Page

An HTML page displaying all available games. Users can browse and filter games by genre, popularity, and other criteria.

#### All Accessories Page

An HTML page showcasing all available gaming accessories. Users can explore and select gaming gear based on their preferences.

### Error Handling

The server includes error handling middleware to catch and log errors, responding with a 500 Internal Server Error message when errors occur.

### Middleware

- Express.js:

Express.js is a Node.js web application framework that provides a robust set of features for building web applications.

- MySQL:

MySQL is an open-source relational database management system (RDBMS) that stores and retrieves data from a database.

- bcrypt:

bcrypt is a password hashing and salt generation library for Node.js.

- body-parser:

body-parser is a Node.js web application middleware for parsing incoming request bodies in a middleware-compatible format.

- express-session:

express-session is a session management middleware for Node.js.

- cors:

cors is a Node.js web application middleware for enabling CORS (Cross-Origin Resource Sharing).

### Routes

The server includes the following routes:

- GET /deals
- GET /games
- GET /gaming_gear
- GET /upcoming
- GET /free_games
- POST /register
- POST /login
- GET /checkloginstatus
- GET /protected
- POST /logout
- GET /details/:id

### IT Diagram

An IT (Information Technology) diagram provides an overview of the web app's technical infrastructure and how different components interact. In the GG PC Games and Gaming Accessories web app, the IT diagram would depict:

- The web server (Express.js) running on a specified port.
- The MySQL database ("gg_database") storing game, deal, user, and other data.
- Client-side components like HTML, CSS, and JavaScript for the frontend.
- API endpoints for data retrieval and user authentication.
- Data flows between the server and the database, as well as between the server and the client.

[IT Diagram](https://gitmind.com/app/docs/mcuxciuo?lang=bs)

### Sitemap

A sitemap is a visual representation of the web app's structure and the relationship between its various pages and sections. It helps users and developers understand how different parts of the web app are interconnected. In the GG PC Games and Gaming Accessories web app, the sitemap should include:

- The homepage and its sections.
- Navigation links to different pages or sections.
- Links to genre-specific game listings.
- Links to deals, upcoming releases, and free games.
- User registration and login pages.
- The user account dashboard.

![image](https://gitmind.com/app/docs/my0wgu9r?lang=bs)

## Backend Documentation

### Server Details

The GG PC Games and Gaming Accessories web app uses Express.js for the server and MySQL for the database. The server runs on port 3306 and connects to the database using the following credentials:

- Host: localhost
- Username: root
- Password: root
- Database: gg_database
- Port: 3306

### Permissions Policy

The Permissions Policy header sets the permissions policy for the web app. It allows the web app to request access to the user's location.

## Database Architecture

The GG PC Games and Gaming Accessories web app uses a MySQL database to store game, deal, user, and other data. The database includes the following tables:

- deals: Stores deal data.
- games: Stores game data.
- gaming_gear: Stores gaming gear data.
- upcoming: Stores upcoming release data.
- free_games: Stores free game data.
- users: Stores user data (for registration and login).

### User Paths

A user path diagram illustrates the typical journey a user takes when interacting with the GG PC Games and Gaming Accessories web app. It helps identify key actions and steps a user goes through to achieve their goals. The user path includes:

- Visit the Homepage: Users start by visiting the homepage, where they see carousel banners highlighting featured content.

- Explore Sections: Users can navigate to different sections like "Games," "Deals," "Upcoming Releases," and "Free Games" from the navigation menu.

- Browse Games: If a user clicks on the "Games" section, they can browse games by genre, view game details, and click the "More Info" button to learn more.

- Registration: To access additional features like saving favorite games, users can register for an account. They provide a username, email, and password.

- Login: Registered users can log in using their credentials.

- User Dashboard: After logging in, users can access their dashboard, which may include features like saved games, profile settings, and logout.

- Logout: Users can log out from their account to end their session.

![image](https://gitmind.com/app/docs/malzlc2u?lang=bs)

## Conclusion

This comprehensive documentation provides all the necessary information for understanding and working with the GameShop web app. Follow the instructions in the ["Getting Started"](#getting-started) section to set up the app and explore the [frontend](#frontend-documentation) and [backend](#backend-documentation) details to gain a deeper understanding of its architecture and functionality.

---

---

**[GG PC Games and Gaming Accessories](index.html)**

&copy; 2023 by AlfaGongGong
