const axios = require('axios');
const mysql = require('mysql2/promise');

// Function to check if an image link is working
const checkImageLink = async (link) => {
      try {
            await axios.get(link);
            return true; // Image link is working
      } catch (error) {
            return false; // Image link is not working
      }
};

// Function to update the image link in the table
const updateImageLink = async (rowId, newLink) => {
      // Update the row in the table with the new image link
};

// Wrap the code inside an async function
const main = async () => {
      // Create a connection pool
      const pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'gg_database',
      });

      // Get a connection from the pool
      const connection = await pool.getConnection();

      // Fetch rows from the table
      const [rows] = await connection.query('SELECT * FROM gaming_accessories');

      // Iterate over each row
      for (const row of rows) {
            const imageLink = row.image;

            // Check if the image link is working
            const isWorking = await checkImageLink(imageLink);

            if (!isWorking) {
                  // Replace the broken image link with a working one
                  const newLink = 'https://res.cloudinary.com/teepublic/image/private/s--Coo9PPLH--/c_crop,x_10,y_10/c_fit,h_1109/c_crop,g_north_west,h_1260,w_1260,x_-138,y_-76/co_rgb:ffffff,e_colorize,u_Misc:One%20Pixel%20Gray/c_scale,g_north_west,h_1260,w_1260/fl_layer_apply,g_north_west,x_-138,y_-76/bo_157px_solid_white/e_overlay,fl_layer_apply,h_1260,l_Misc:Art%20Print%20Bumpmap,w_1260/e_shadow,x_6,y_6/c_limit,h_1254,w_1254/c_lpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1539384919/production/designs/3309274_0.jpg';

                  // Update the row in the table with the new image link
                  await updateImageLink(row.id, newLink);
            }
      }

      // Release the connection back to the pool
      connection.release();

      // Close the connection pool
      pool.end();
};

// Call the main function
main();