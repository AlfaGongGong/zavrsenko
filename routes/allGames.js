const express = require('express');
const router = express.Router();
const allGames = require('../services/allGames');

router.get('/', async function (req, res, next) {
      try {
            res.json(await allGames.getMultiple(req.query.page));
      } catch (err) {
            console.error('Error while getting all games', err.message);
            next(err);
      }
});

module.exports = router;