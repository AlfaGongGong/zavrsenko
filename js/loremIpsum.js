const mysql = require("mysql2/promise");

// Define your texts
const texts = [
  "Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro...",
  "Qui animated corpse, cricket bat max brucks terribilem incessu zomby...",
  "Satoshi Nakamoto launched lots of decentralisation when Litecoin required...",
];

async function updateDescriptions() {
  // Create a connection to your MySQL DB
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
  });

  // Fetch all product ids
  const [productIds] = await connection.execute("SELECT id FROM products");

  // For each product, set a random description
  for (let product of productIds) {
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    await connection.execute(
      "UPDATE products SET description = ? WHERE id = ?",
      [randomText, product.id],
    );
  }

  // Close the connection
  await connection.end();
}

updateDescriptions().catch(console.error);
