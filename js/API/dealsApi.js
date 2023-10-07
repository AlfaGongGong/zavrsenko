const express = require("express");
const cors =  require("cors");
const mysql = require("mysql2/promise");
const axios = require("axios");
const { database, rapidApiKey, port } = require("../config/config.js");
const { fromUnixTime } = require("date-fns");


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = port;

const dbConfig = database;

const apiConfig = {
  url: "https://www.cheapshark.com/api/1.0/deals",
  params: {
    storeID: 1,
    upperPrice: 15,
    limit: 500, // Set the limit to 500 items
  },
};

const connectionPool = mysql.createPool(dbConfig);

const mapData = (data) => {
  return data.map((item) => {
    return {
      title: item.title,
      salePrice: item.salePrice,
      normalPrice: item.normalPrice,
      releaseDate: fromUnixTime(item.releaseDate).toLocaleDateString("en-GB"),
      score: item.metacriticScore,
      image: item.thumb,
    };
  });
};

const fetchDataFromApi = async () => {
  try {
    const response = await axios.get(apiConfig.url, {
      params: apiConfig.params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const insertDataIntoDatabase = async (data) => {
  const mappedData = mapData(data);
  const values = mappedData.map((item) => [
    item.title,
    item.salePrice,
    item.normalPrice,
    item.releaseDate,
    item.score,
    item.image,
  ]);

  const connection = await connectionPool.getConnection();
  try {
    await connection.query(
      "INSERT IGNORE INTO deals (title, salePrice, normalPrice, releaseDate, score, image) VALUES ?",
      [values]
    );
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

const fetchAndInsertData = async () => {
  try {
    console.log("Fetching data from the API...");
    const apiData = await fetchDataFromApi();
    console.log("Data fetched successfully from the API.");

    console.log("Inserting data into the database...");
    await insertDataIntoDatabase(apiData);
    console.log("Data inserted successfully into the database.");
  } catch (error) {
    console.error("Error:", error);
  }
};

// Define a route to fetch and insert data
app.get("/fetchData", (_req, res) => {
  fetchAndInsertData()
    .then(() => {
      res
        .status(200)
        .json({ message: "Data fetched and inserted successfully" });
    })
    .catch((err) => {
      console.error("Error fetching and inserting data:", err);
      res.status(500).json({ error: "Error fetching and inserting data" });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

