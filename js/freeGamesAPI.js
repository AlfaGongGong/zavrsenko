const { fromUnixTime } = require('date-fns');
const express = require('express');
const mysql = require('mysql2');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect with API, fetch data
const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
      headers: {
            'X-RapidAPI-Key': 'f6d1f840a3msh19d03ebda2bde72p14ca93jsn16413aedab2d',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
      },
};

const getData = async () => {
      try {
            const response = await axios.request(options);
            return response.data;
      } catch (error) {
            console.error(error);
            throw error;
      }
};

// Map data from API, insert data into MySQL database and return data
const mapData = async () => {
      try {
            const data = await getData();
            return data.map((item) => ({
                  title: item.title,
                  image: item.thumbnail,
                  description: item.short_description,
                  url: item.game_url,
                  genre: item.genre,
                  platform: item.platform,
                  publisher: item.publisher,
                  developer: item.developer,
                  releaseDate: fromUnixTime(item.release_date).toLocaleDateString('en-GB'),
                  free_to_play: item.freetogame_profile_url,
            }));
      } catch (error) {
            console.error(error);
            throw error;
      }
};

const insertData = async () => {
      try {
            const connection = mysql.createConnection({
                  host: 'localhost',
                  user: 'root',
                  password: 'root',
                  database: 'gg_database',
                  port: 3306,
                  connectTimeout: 30000,
            });

            connection.connect((err) => {
                  if (err) {
                        console.error('Error connecting to MySQL:', err);
                        throw err;
                  }
                  console.log('Connected to MySQL');
            });

            const mappedData = await mapData();
            const values = mappedData.map((item) => [
                  item.title,
                  item.image,
                  item.description,
                  item.url,
                  item.genre,
                  item.platform,
                  item.publisher,
                  item.developer,
                  item.releaseDate,
                  item.free_to_play,
            ]);

            connection.query(
                  'INSERT IGNORE INTO free_games (title, image, description, url, genre, platform, publisher, developer, releaseDate, free_to_play) VALUES ?',
                  [values],
                  (err, result) => {
                        if (err) {
                              console.error('Error executing MySQL query:', err);
                              throw err;
                        }
                        console.log(result);
                        connection.end();
                  }
            );
      } catch (error) {
            console.error(error);
            throw error;
      }
};

insertData().catch((error) => {
      console.error('An error occurred:', error);
});