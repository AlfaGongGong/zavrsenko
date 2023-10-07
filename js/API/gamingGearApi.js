const axios = require("axios");
const mysql = require("mysql2/promise");
const config = require("../config/config.js");

// MySQL connection
const dbConfig = {
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.databaseName,
  port: config.database.port,
};

// Axios request options
const apiOptions = {
  method: "GET",
  url: "https://amazon-merchant-data.p.rapidapi.com/search-products",
  params: {
    term: "roccat; razer; steelseries: logitech; corsair; asus;",
    country: "us",
  },
  headers: {
    "X-RapidAPI-Key": config.apiKeys.rapidApiKey,
    "X-RapidAPI-Host": "amazon-merchant-data.p.rapidapi.com",
  },
};

async function fetchAndInsertItems() {
  try {
    // MySQL connection pool
    const pool = mysql.createPool(dbConfig);

    // variables for pagination and item limit
    let offset = 0;
    let allItems = [];
    const itemLimit = 250;

    console.log("Fetching items from the API...");

    while (true) {
      //  offset for pagination
      apiOptions.params.offset = offset;

      // Fetch data from the API
      const response = await axios.request(apiOptions);
      const items = response.data.content.offers;

      if (items.length === 0 || allItems.length >= itemLimit) {
        break;
      }

      const remainingItems = itemLimit - allItems.length;
      const numToFetch = Math.min(remainingItems, items.length);

      allItems = allItems.concat(items.slice(0, numToFetch));

      offset += numToFetch;

      console.log(
        `Fetched ${numToFetch} items (Total: ${allItems.length} items)`
      );

      if (allItems.length >= itemLimit) {
        break;
      }
    }

    console.log("All items fetched.");

    // Use Promise.all to insert items in parallel
    await Promise.all(
      allItems.map(async (item) => {
        const {
          name,
          asin,
          link,
          image,
          review_rating,
          review_count,
          is_amazon_choice,
          is_bestseller,
          is_prime,
          price,
        } = item;

        // insert the item into the gaming_gear table
        const sql = `
          INSERT IGNORE INTO gaming_gear (name, asin, link, image, review_rating, review_count, is_amazon_choice, is_bestseller, is_prime, price)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await pool.query(sql, [
          name,
          asin,
          link,
          image,
          review_rating,
          review_count,
          is_amazon_choice,
          is_bestseller,
          is_prime,
          price,
        ]);

        console.log(`Inserted item with ASIN: ${asin}`);
      })
    );

    console.log("All items inserted successfully.");

    pool.end();
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchAndInsertItems();
