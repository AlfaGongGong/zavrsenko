const axios = require('axios');

const getGamespotEvents = async () => {
      let optionsEvents;

      try {
            const startDateString = '2022-01-01';
            const endDateString = '2022-12-31';

            optionsEvents = {
                  method: 'GET',
                  url: 'https://www.gamespot.com/api/events',
                  headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.207.132.170 Safari/537.36',
                  },
                  params: {
                        api_key: 'f6d1f840a3msh19d03ebda2bde72p14ca93jsn16413aedab2d',
                        format: 'json',
                        filter: `startDate:${startDateString}|endDate:${endDateString}`,
                        limit: '10',
                        sort: 'field:desc'
                  },
            };

            const response = await axios(optionsEvents);
            console.log(response.data);
            return response.data;
      } catch (error) {
            console.error('Error fetching Gamespot events:', error);
      }
};

const generateEventCards = (data) => {
      console.log(data); // Log the data to inspect its structure
      let html = '';
      if (data && data.events) {
            data.events.forEach(event => {
                  html += `
        <div class="gamespot-event-card">
          <img src="${event.image}" alt="${event.name}">
          <div class="gamespot-event-details">
            <h2 class="gamespot-event-title">${event.name}</h2>
          </div>
        </div>
      `;
            });
      }
      return html;
};

(async () => {
      try {
            const response = await getGamespotEvents();
            console.log(response);

            const eventCardsHtml = generateEventCards(response);
            console.log(eventCardsHtml);

            // Write the eventCardsHtml to a file or send it as a response in a web server scenario
      } catch (error) {
            console.error('Error fetching Gamespot events:', error);
      }
})();
