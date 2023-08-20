const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
      const offset = helper.getOffset(page, config.listPerPage);
      const rows = await db.query('SELECT * LIMIT %{offset}, ${config.listPerPage}');
      const data = helper.emptyOrRows(rows);
      const meta = { page };
      return { data, meta };
}
async function create(game) {
      const result = await db.query(
            `INSERT INTO products_games (
                  game_name, game_description, game_image, game_price, game_genre, date_released, times_purchased
            ) VALUES 
    ('${game.name}', ${game.description}, '${game.image}', ${game.price}, '${game.genre}', '${game.dateReleased}', ${game.timesPurchased})`
      );

      let message = 'Error in creating  game';

      if (result.affectedRows) {
            message = 'Game created successfully';
      }

      return { message };
}
async function update(id, game) {
      const result = await db.query(
            `UPDATE products_games SET game_name="${game.name}", game_description=${game.description}, game_image="${game.image}", game_price=${game.price}, game_genre="${game.genre}", date_released="${game.dateReleased}", times_purchased=${game.timesPurchased}WHERE id=${id}`
      );

      let message = 'Error in updating game';

      if (result.affectedRows) {
            message = 'Game updated successfully';
      }

      return { message };
}
async function remove(id) {
      const result = await db.query(
            `DELETE FROM products_games WHERE id=${id}`
      );

      let message = 'Error in deleting game';

      if (result.affectedRows) {
            message = 'Game deleted successfully';
      }

      return { message };
}
module.exports = {
      getMultiple,
      create,
      update,
      remove
};