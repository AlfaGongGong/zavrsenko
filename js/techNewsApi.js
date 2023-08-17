const axios = require('axios');

const url =
      'https://newsdata.io/api/1/news?q=technology&language=en&category=technology,&apikey=pub_27815e29d16ebeaa27970e531a7f573851bc7';

const options = {
      headers: {
            country: 'us',
            image: '1',
            video: '0',
      },
};

const renderNews = async () => {
      try {
            const response = await axios.get(url, options);
            const articles = response.data;
            console.log(articles);
            return articles;
      } catch (error) {
            console.error('An error occurred:', error);
      }

};

renderNews();
