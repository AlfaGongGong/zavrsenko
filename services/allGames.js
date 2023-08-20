const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
      const offset = helper.getOffset(page, config.listPerPage);
      const rows = await db.query('SELECT  game_name,game_description, game_image,game_price, game_genre,date_released, times_purchased FROM products_games LIMIT %{offset}, ${config.listPerPage}');
      const data = helper.emptyOrRows(rows);
      const meta = { page };
      return { data, meta };
}

module.exports = { getMultiple };