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
router.post('/', async function (req, res, next) {
      try {
            res.json(await products_games.create(req.body));
      } catch (err) {
            console.error(`Error while creating game`, err.message);
            next(err);
      }
});
router.put('/:id', async function (req, res, next) {
      try {
            res.json(await products_games.update(req.params.id, req.body));
      } catch (err) {
            console.error(`Error while updating game`, err.message);
            next(err);
      }
});

router.delete('/:id', async function (req, res, next) {
      try {
            res.json(await products_games.remove(req.params.id));
      } catch (err) {
            console.error(`Error while deleting game`, err.message);
            next(err);
      }
});
module.exports = router;