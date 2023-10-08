const express = require("express");
const axios = require("axios");
const mysql = require("mysql2/promise");
const config = require("../config/config.js");
const errorHandler = require("../middleware/errorHandling");

const app = express();

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
  url: "https://opencritic-api.p.rapidapi.com/game/upcoming",
  headers: {
    "X-RapidAPI-Key": config.apiKeys.rapidApiKey,
    "X-RapidAPI-Host": "opencritic-api.p.rapidapi.com",
  },
};

const fetchAndInsertItems = async () => {
  try {
    const pool = mysql.createPool(dbConfig);

    let offset = 0;
    let allItems = [];
    const itemLimit = 250;

    console.log("Fetching items from the API...");

    while (true) {
      // Set the offset for pagination
      apiOptions.params.offset = offset;

      // Fetch data from the API
      const response = await axios.request(apiOptions);
      const items = response.data.content.offers;

      // Check if there are more items to fetch
      if (items.length === 0 || allItems.length >= itemLimit) {
        break;
      }

      // Calculate how many more items can be fetched without exceeding the limit
      const remainingItems = itemLimit - allItems.length;
      const numToFetch = Math.min(remainingItems, items.length);

      // Slice and concatenate the newly fetched items with the existing items
      allItems = allItems.concat(items.slice(0, numToFetch));

      // Increment the offset for the next request
      offset += numToFetch;

      console.log(
        `Fetched ${numToFetch} items (Total: ${allItems.length} items)`
      );

      // If the item limit has been reached, break the loop
      if (allItems.length >= itemLimit) {
        break;
      }
    }

    console.log("All items fetched.");

    // Use a loop to insert each item into the database
    for (const item of allItems) {
      const { name, id, firstReleaseDate, tier, images, topCriticScore } = item;
      const sql = `
        INSERT IGNORE INTO gaming_gear (name, id, firstReleaseDate, tier, images, topCriticScore)
        VALUES (?,?,?,?,?,?)
      `;
      await pool.query(sql, [
        name,
        id,
        firstReleaseDate,
        tier,
        images,
        topCriticScore,
      ]);
      console.log(`Inserted item with ID: ${id}`);
    }

    console.log("All items inserted successfully.");
    pool.end();
  } catch (error) {
    console.error("Error:", error);
  }
};

// Call the fetchAndInsertItems function
fetchAndInsertItems();

app.use(errorHandler);
