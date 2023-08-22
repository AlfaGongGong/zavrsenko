// api.js

const express = require('express');
const axios = require('axios');
const mysql = require('mysql2');
const logger = require('winston');
const cron = require('node-cron');
const _ = require('lodash');
const cors = require('cors');

const app = express();
const winston = require('winston');

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

logger.add(new winston.transports.File({ filename: './logs/api.log' }));
// MySQL connection
const connection = mysql.createConnection(
      config = {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'gg_database',
            port: 3306,
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

// Create connection pool
const pool = mysql.createPool(config);

// Handle disconnects

pool.on('connection', (connection) => {
      connection.on('error', (err) => {
            if (!err.fatal) {
                  connection.connect();
            }
      });
});

// Handle errors

pool.on('error', (err) => {
      console.error('DB connection pool error:', err);
});

// Make test query

pool.query('SELECT * FROM games LIMIT 5 ', (err, results) => {
      if (err) throw err;

      console.log('Query results:', results);
      logger.info('Query results:', results);

});

// Handle disconnects 
pool.on('connection', (connection) => {
      connection.on('error', (err) => {
            if (!err.fatal) {
                  connection.connect();
            }
      });
});

const gamesList = {

      method: 'GET',
      url: 'https://api.rawg.io/api/games?key=922f629661bf480cadd2986542dfe6fa&platform=1&dates=2020-01-01,2023-01-01',
};

const topTen = {
      method: 'GET',
      url: 'https://api.rawg.io/api/games?key=922f629661bf480cadd2986542dfe6fa&metacritic=70,100',

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
const getGames = () => {
      return axios.request(gamesList)
            .then(resp => resp.data);
}

const topList = async () => {
      try {
            const resp = await axios.request(topTen);
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
try {
      const syncData = async () => await Promise.all([
            getGames(),
            getReviews(),
            getUpcoming(),
            getFreeGames(),
            topList(),
            getReviews()
      ]);
      const allGames = syncData();

      logger.info('Synced data');

      console.log(allGames);

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

cron.schedule('*/5 * * * *', () => {
      syncData();
});

// Product card route
app.get('/games', async (req, res) => {
      const games = await getGamesFromDB();

      res.render('games', { games });
})

app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      logger.info(`Server running on port ${port}`);

});

console.log(connection);

module.exports = {
      app,
      pool
};
