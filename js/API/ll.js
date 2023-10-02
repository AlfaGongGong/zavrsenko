const axios = require('axios');

const getAllGames = async () => {
  const options = {
    method: 'GET',
    url: 'https://api.rawg.io/api/games?key=da3ce49249fa4b38aeee019c37d65033',
    headers: {
      'X-RapidAPI-Key': 'f6d1f840a3msh19d03ebda2bde72p14ca93jsn16413aedab2d',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
    },
    params: {
      page: 1,
      page_size: 100,
    }
  };

  try {
    const response = await axios.request(options);

    if (response.status === 200) {
      console.log('Data fetched successfully');
      console.log(response.data);
    } else {
      console.error('Failed to fetch data. Status code:', response.status);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return an empty array in case of an error
  }
};

getAllGames();
