// api.js

const express = require('express');
const axios = require('axios');
const mysql = require('mysql2');
const logger = require('winston');
const cron = require('node-cron');
const _ = require('lodash');

const app = express();
const winston = require('winston');

app.use(express());

logger.add(new winston.transports.File({ filename: './logs/api.log' }));
// MySQL connection
const connection = mysql.createConnection(
      config = {
            host: 'localhost',
            user: 'admin',
            password: 'admin',
            database: 'gg_database',
            port: 3000,
            connectTimeout: 60000,

      }
);

connection.connect((err) => {
      if (err) {
            logger.error(err);
            console.log(err);
      }
      logger.info('Connected to database');
      console.log('Connected to database');
});

const gamesList = {

      method: 'GET',
      url: 'https://rawg-video-games-database.p.rapidapi.com/games',
      headers: {
            'X-RapidAPI-Key': 'f6d1f840a3msh19d03ebda2bde72p14ca93jsn16413aedab2d',
            'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
      }
};

const gameDetails = {
      method: 'GET',
      url: 'https://rawg-video-games-database.p.rapidapi.com/games/%7Bgame_pk%7D',
      headers: {
            'X-RapidAPI-Key': 'f6d1f840a3msh19d03ebda2bde72p14ca93jsn16413aedab2d',
            'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
      }
};

const upcomingGames = {
      method: 'GET',
      url: 'https://opencritic-api.p.rapidapi.com/game/upcoming',
      headers: {
            'X-RapidAPI-Key': 'f6d1f840a3msh19d03ebda2bde72p14ca93jsn16413aedab2d',
            'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
      }
};

const reviewsThisWeek = {
      method: 'GET',
      url: 'https://opencritic-api.p.rapidapi.com/game/reviewed-this-week',
      headers: {
            'X-RapidAPI-Key': 'f6d1f840a3msh19d03ebda2bde72p14ca93jsn16413aedab2d',
            'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
      }
};

const freeGames = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
      headers: {
            'X-RapidAPI-Key': 'f6d1f840a3msh19d03ebda2bde72p14ca93jsn16413aedab2d',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
};

app.set('view engine', 'ejs');

// API functions 
const allGames = async () => {
      try {
            const resp = await axios.request(gamesList);
            return resp.data;
      } catch (error) {
            logger.error(error);
            return error;
      }
};
const details = async () => {
      try {
            const resp = await axios.request(gameDetails);
            return resp.data;
      } catch (error) {
            logger.error(error);
            return error;
      }
};

const getUpcoming = async () => {
      try {
            const resp = await axios.request(upcomingGames);
            return resp.data;
      } catch (error) {
            logger.error(error);
            return error;
      }
};

const getReviews = async () => {
      try {
            const resp = await axios.request(reviews);
            return resp.data;
      } catch (error) {
            // handle error 
            logger.error(error);
            return error;

      }
};

const getFreeGames = async () => {
      try {
            const resp = await axios.request(freeGames);
            return resp.data;
      } catch (error) {
            // handle error 
            logger.error(error);
            return error;
      };
};

// Sync function
const syncData = async () => {
      try {
            const [allGames, details, getUpcoming, getReviews, getFreeGames] = await Promise.all([allGames(), details(), getUpcoming(), getReviews(), getFreeGames()]);

            const dedupedAllGames = _.uniqBy(allGames, 'id');
            const dedupedDetails = _.uniqBy(details, 'id');
            const dedupedGetUpcoming = _.uniqBy(getUpcoming, 'id');
            const dedupedGetReviews = _.uniqBy(getReviews, 'id');
            const dedupedGetFreeGames = _.uniqBy(getFreeGames, 'id');

            connection.query('CREATE NEW ROWS IF NOT EXISTS INSERT INTO products_games SET ? ON DUPLICATE KEY UPDATE text=VALUES(text)', dedupedAllGames);
            connection.query('CREATE NEW ROWS IF NOT EXISTS INSERT INTO details SET? ON DUPLICATE KEY UPDATE text=VALUES(text)', dedupedDetails);
            connection.query('CREATE NEW ROWS IF NOT EXISTS INSERT INTO upcoming SET? ON DUPLICATE KEY UPDATE text=VALUES(text)', dedupedGetUpcoming);
            connection.query('CREATE NEW ROWS IF NOT EXISTS INSERT INTO reviews SET? ON DUPLICATE KEY UPDATE text=VALUES(text)', dedupedGetReviews);
            connection.query('CREATE NEW ROWS IF NOT EXISTS INSERT INTO free SET? ON DUPLICATE KEY UPDATE text=VALUES(text)', dedupedGetFreeGames);

            logger.info('Synced data');

      } catch (error) {
            logger.error(error);
            return error;
      }

      cron.schedule('* *10 * * *', () => {
            syncData();
      })
};

// Product card route
app.get('/card', async (req, res) => {
      const result = await connection.query('SELECT * FROM games_products');

      res.render('products', { products: result });

});

app.listen(3000);
console.log(connection);

module.exports = app;
