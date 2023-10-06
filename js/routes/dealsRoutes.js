const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.get("/deals", (req, res) => {
    db.query(
      "SELECT * FROM deals ORDER BY RAND() DESC LIMIT 6;",
      (err, results) => {
        if (err) {
          console.error("Error executing MySQL query:", err);
          res.status(500).send("Error fetching data from the database");
          return;
        }
  
        res.json(results);
      }
    );
  });