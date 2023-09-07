
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
            password: 'root',
            database: 'gg_database',
            port: 3306,
            connectTimeout: 60000,

      }
);
connection.connect((err) => {
      if (err) {
            console.log(err);

            logger.error(err);
      }
      console.log('Connected to database');

      logger.info('Connected to database');
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

const reviews = {
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
            console.log(resp.data);

            return resp.data;
      } catch (error) {
            console.log(error);
            logger.error(error);
            return error;
      }
};

const getUpcoming = async () => {
      try {
            const resp = await axios.request(upcomingGames);
            console.log(resp.data);

            return resp.data;
      } catch (error) {
            console.log(error);

            logger.error(error);
            return error;
      }
};

const getReviews = async () => {
      try {
            const resp = await axios.request(reviews);
            console.log(resp.data);
            return resp.data;
      } catch (error) {
            // handle error 
            console.log(error);

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
            console.log(error);

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
      console.log(allGames);
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
