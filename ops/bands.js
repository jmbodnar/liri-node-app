const [command, ...value] = process.argv.slice(2);
const band = value
  .join(' ')
  .trim()
  .toLowerCase();
const axios = require('axios');

const getBandInfo = () => {
  return axios
    .get(
      `https://rest.bandsintown.com/artists/${encodeURIComponent(
        band
      )}/events?app_id=codingbootcamp`
    )
    .then(response => {
      console.log(`\n===== EVENTS LIST FOR ${band.toUpperCase()} =====\n`);
      response.data.forEach(event => {
        const date = new Date(event.datetime);
        let datestring = `${String(date.getMonth() + 1).padStart(
          2,
          '0'
        )}/${date.getDate()}/${date.getFullYear()}`;
        console.log(`\n\tVenue Name: ${event.venue.name}`);
        console.log(
          `\tEvent Location: ${
            event.venue.city ? event.venue.city + ', ' : ''
          }${event.venue.region ? event.venue.region + ', ' : ''}${
            event.venue.country ? event.venue.country : ''
          }`
        );
        console.log(`\tEvent Date: ${datestring}\n`);
      });
      console.log(`\n===== END EVENTS LIST FOR ${band.toUpperCase()} =====`);
    })
    .catch(error => {
      console.log('Problem:', error.response.data.message);
      // if (error.response) {
      //   console.log(error.response.data);
      //   console.log(error.response.status);
      //   console.log(error.response.headers);
      // } else if (error.request) {
      //   console.log(error.request);
      // } else {
      //   console.log('Error', error.message);
      // }
      // console.log(error.config);
    });
};

module.exports = { getBandInfo };
