const { fromUnixTime } = require('date-fns');
const express = require('express');
const mysql = require('mysql2');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect with API, fetch data, map data from api, insert data into mysql database and return data
const mapData = (data) => {
      return data.map((item) => {
            return {
                  title: item.title,
                  salePrice: item.salePrice,
                  normalPrice: item.normalPrice,
                  releaseDate: fromUnixTime(item.releaseDate), // Convert timestamp to date
                  score: item.metacriticScore,
                  image: item.thumb,
            };
      });
};

const getData = () => {
      return axios.get("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15")
            .then((response) => response.data)
            .then((data) => mapData(data));

};

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
            console.error('Error connecting to database:', err);
            return;
      }
      console.log('Connected to database');
});

getData()
      .then((data) => {
            const values = data.map((item) => [
                  item.title,
                  item.salePrice,
                  item.normalPrice,
                  item.releaseDate,
                  item.score,
                  item.image
            ]);

            connection.query('INSERT INTO deals (title, salePrice, normalPrice, releaseDate, score, image) VALUES ?', [values], (err, result) => {
                  if (err) throw err;
                  console.log(result);
            });
      })
      .catch((err) => {
            console.log(err);
      })
      .finally(() => {
            connection.end();
      });

app.listen(3000);

//schedule to repeat code with cron

const cron = require('node-cron');

cron.schedule('*/10 * * * *', () => {
      getData()
            .then((data) => {
                  const values = data.map((item) => [
                        item.title,
                        item.salePrice,
                        item.normalPrice,
                        item.releaseDate,
                        item.score,
                        item.image
                  ]);

                  connection.query('INSERT INTO deals (title, salePrice, normalPrice, releaseDate, score, image) VALUES?', [values], (err, result) => {
                        if (err) throw err;
                        console.log(result);
                  });
            })
            .catch((err) => {
                  console.log(err);
            })
            .finally(() => {
                  connection.end();
            });
});
