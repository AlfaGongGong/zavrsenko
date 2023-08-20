

const express = require('express');
const cors = require('cors');
const router = require('./routes/allGames');
const { createRequire } = require('node:module');
const { getMultiple } = require('./services/allGames');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
      res.json({ message: 'OK' });
});

app.use('/products_games', router);

app.use((err, req, res, next) => {
      const statusCode = err.statusCode || 500;
      console.error(err.message, err.stack);
      res.status(statusCode).json({ message: err.message });
      return;
});

app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
});

var requestOptions = {
      method: 'GET',
      redirect: 'follow'
};

fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

getMultiple("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15", {
      method: 'GET',
      redirect: 'follow'

})

      .then(result => localStorage.setItem('allGames', JSON.stringify(result)))

      .then(result => console.log(result))
      .catch(error => console.log('error', error));
