const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://opencritic-api.p.rapidapi.com/game/upcoming',
  headers: {
    'X-RapidAPI-Key': '01f9a9ce85msh564be75a50c2168p18ce9bjsn9c7c10285d49',
    'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
  }
};

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gg_database',
    connectionLimit: 10,
    port: 3306,
  };


const fetchDataFromAPI = async () => {
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
            const { name, id, firstReleaseDate, tier, images, topCriticScore} = item;

fetchDataFromAPI();


