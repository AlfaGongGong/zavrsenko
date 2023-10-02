const axios = require('axios');
const mysql = require('mysql2/promise');

// Define your MySQL connection details
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'gg_database',
  connectionLimit: 10,
  port: 3306,
};

// Axios request options
const apiOptions = {
  method: 'GET',
  url: 'https://amazon-merchant-data.p.rapidapi.com/search-products',
  params: {
    term: 'roccat; razer; steelseries: logitech; corsair; asus;',
    country: 'us',
  },
  headers: {
    'X-RapidAPI-Key': '01f9a9ce85msh564be75a50c2168p18ce9bjsn9c7c10285d49',
    'X-RapidAPI-Host': 'amazon-merchant-data.p.rapidapi.com',
  },
};

async function fetchAndInsertItems() {
  try {
    // Create a MySQL connection pool
    const pool = mysql.createPool(dbConfig);

    // Initialize variables for pagination and item limit
    let offset = 0;
    let allItems = [];
    const itemLimit = 250;

    console.log('Fetching items from the API...');

    while (true) {
      // Set the offset for pagination
      apiOptions.params.offset = offset;

      // Fetch data from the API
      const response = await axios.request(apiOptions);
      const items = response.data.content.offers;

      // Check if there are more items to fetch
      if (items.length === 0 || allItems.length >= itemLimit) {
        break; // No more items to fetch or reached the item limit
      }

      // Calculate how many more items can be fetched without exceeding the limit
      const remainingItems = itemLimit - allItems.length;
      const numToFetch = Math.min(remainingItems, items.length);

      // Slice and concatenate the newly fetched items with the existing items
      allItems = allItems.concat(items.slice(0, numToFetch));

      // Increment the offset for the next request
      offset += numToFetch;

      console.log(`Fetched ${numToFetch} items (Total: ${allItems.length} items)`);

      // If the item limit has been reached, break the loop
      if (allItems.length >= itemLimit) {
        break;
      }
    } 

    console.log('All items fetched.');

    // Use a loop to insert each item into the database
    for (const item of allItems) {
      const { name, asin, link, image, review_rating, review_count, is_amazon_choice, is_bestseller, is_prime, price } = item;

      // SQL query to insert the item into the gaming_gear table with IGNORE
      const sql = `
        INSERT IGNORE INTO gaming_gear (name, asin, link, image, review_rating, review_count, is_amazon_choice, is_bestseller, is_prime, price)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      // Execute the SQL query
      await pool.query(sql, [name, asin, link, image, review_rating, review_count, is_amazon_choice, is_bestseller, is_prime, price]);

      console.log(`Inserted item with ASIN: ${asin}`);
    }

    console.log('All items inserted successfully.');

    // Close the MySQL connection pool
    pool.end();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to fetch and insert items
fetchAndInsertItems();
