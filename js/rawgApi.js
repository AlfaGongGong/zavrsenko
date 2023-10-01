const express = require('express');
const mysql = require('mysql2/promise'); 
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a connection pool for MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'gg_database',
  connectionLimit: 10, 
  port: 3306,
});

// Function to fetch data from the API
const getAllGames = async () => {
  const options = {
    method: 'GET',
    url: 'https://api.rawg.io/api/games?key=da3ce49249fa4b38aeee019c37d65033&page=1&page_size=100',
  };

  try {
    console.log('Fetching data...');
    console.time('Fetching data');
    const response = await axios.request(options);
    console.timeEnd('Fetching data');

    console.log(response.data);
    return response.data.results; // Return the games data from the API response
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return an empty array in case of an error
  }
};

// Define the mapData function to map API data
const mapData = (games) => {
  try {
    console.log('Mapping data...');
    console.time('Mapping data');
    return games.map((item) => {
      const esrbRating = item.esrb_rating || {}; 
      const platforms = item.platforms || [];

      // Map API fields to database columns
      return [
        item.slug || null,
        item.name || null,
        item.released || null,
        item.tba || null,
        item.background_image || null,
        item.rating || null,
        item.rating_top || null,
        item.ratings_count || null,
        item.reviews_text_count || null,
        item.added || null,
        item.metacritic || null,
        item.playtime || null,
        item.suggestions_count || null,
        item.updated || null,
        esrbRating.id || null,
        esrbRating.slug || null,
        esrbRating.name || null,
        platforms.length > 0 ? platforms[0].platform.id : null,
        platforms.length > 0 ? platforms[0].platform.slug : null,
        platforms.length > 0 ? platforms[0].platform.name : null,
        platforms.length > 0 ? platforms[0].released_at : null,
        platforms.length > 0 ? platforms[0].requirements?.minimum || null : null,
        platforms.length > 0 ? platforms[0].requirements?.recommended || null : null,
      ];
    });
  } catch (error) {
    console.error('Error mapping data:', error);
    return [];
  } finally {
    console.timeEnd('Mapping data');
  }
};

const insertData = async (mappedData) => {
  let connection;
  try {
    console.log('Inserting data...');
    console.time('Inserting data');
    connection = await pool.getConnection(); 

    console.log('Connected to MySQL');

    const chunkSize = 100;
    for (let i = 0; i < mappedData.length; i += chunkSize) {
      const chunk = mappedData.slice(i, i + chunkSize);
      const query = `INSERT IGNORE INTO games (
        slug, 
        name, 
        released, 
        tba, 
        background_image, 
        rating, 
        rating_top, 
        ratings_count, 
        reviews_text_count, 
        added, 
        metacritic, 
        playtime, 
        suggestions_count, 
        updated, 
        esrb_rating_id, 
        esrb_rating_slug, 
        esrb_rating_name, 
        platform_id, 
        platform_slug, 
        platform_name, 
        platform_released_at, 
        platform_requirements_minimum, 
        platform_requirements_recommended
      )  VALUES ?`;

      const [result] = await connection.query(query, [chunk]);
      console.log(`Inserted ${result.affectedRows} rows into the database.`);
    }

    console.timeEnd('Inserting data');
  } catch (error) {
    console.error('An error occurred while inserting data:', error.message); // Log the specific error message
  } finally {
    if (connection) {
      connection.release(); // Release the connection back to the pool
    }
  }
};



// Maintain a Set to store unique game slugs that have been inserted
const insertedGameSlugs = new Set();



// Initialize lastFetchedTimestamp to an empty string
let lastFetchedTimestamp = '';


// Initialize lastFetchedId to an empty string
let lastFetchedId = '';


// Initialize page number to 1
let pageNumber = 1;

// ...

async function fetchAndUpdateData() {
  try {
    const options = {
      method: 'GET',
      url: `https://api.rawg.io/api/games?key=da3ce49249fa4b38aeee019c37d65033&page=${pageNumber}&page_size=100`,
    };

    console.log('Fetching and updating data for page', pageNumber);

    const response = await axios.request(options);
    const gamesData = response.data.results;

    if (gamesData.length === 0) {
      console.log('No new data found. Exiting.');
      return;
    }

    // Iterate through the fetched games and insert only if not already inserted
    const mappedData = mapData(gamesData.filter((game) => !insertedGameSlugs.has(game.slug)));

    if (mappedData.length === 0) {
      console.log('No new data to insert. Exiting.');
    } else {
      await insertData(mappedData);

      // Update the set of inserted game slugs
      mappedData.forEach((game) => insertedGameSlugs.add(game[0]));
    }

    // Increment the page number for the next request
    pageNumber++;

    // Continue fetching and updating
    fetchAndUpdateData();
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

fetchAndUpdateData();
