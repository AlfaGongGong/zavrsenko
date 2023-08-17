const request = require('request');

const options = {
      method: 'GET',
      url: 'https://opencritic-api.p.rapidapi.com/game/upcoming',
      headers: {
            'X-RapidAPI-Key': 'f6d1f840a3msh19d03ebda2bde72p14ca93jsn16413aedab2d',
            'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
      }
};

request(options, (error, response, body) => {
      if (error) throw new Error(error);

      console.log(body);
});
