const fs = require('fs');
const [command, ...value] = process.argv.slice(2);
let band = value
  .join(' ')
  .trim()
  .toLowerCase();
const axios = require('axios');

if (!band) band = 'Philip Glass';

const getBandInfo = () => {
  return axios
    .get(
      `https://rest.bandsintown.com/artists/${encodeURIComponent(
        band
      )}/events?app_id=codingbootcamp`
    )
    .then(response => {
      let out = '';
      console.log(`\n===== EVENTS LIST FOR ${band.toUpperCase()} =====\n`);
      out += `\n===== EVENTS LIST FOR ${band.toUpperCase()} =====\n`;
      response.data.forEach(event => {
        const date = new Date(event.datetime);
        let datestring = `${String(date.getMonth() + 1).padStart(
          2,
          '0'
        )}/${date.getDate()}/${date.getFullYear()}`;
        console.log(`\n\tVenue Name: ${event.venue.name}`);
        out += `\n\tVenue Name: ${event.venue.name}\n`;
        console.log(
          `\tEvent Location: ${
            event.venue.city ? event.venue.city + ', ' : ''
          }${event.venue.region ? event.venue.region + ', ' : ''}${
            event.venue.country ? event.venue.country : ''
          }`
        );
        out += `\tEvent Location: ${
          event.venue.city ? event.venue.city + ', ' : ''
        }${event.venue.region ? event.venue.region + ', ' : ''}${
          event.venue.country ? event.venue.country : ''
        }\n`;
        console.log(`\tEvent Date: ${datestring}\n`);
        out += `\tEvent Date: ${datestring}\n`;
      });
      console.log(`\n===== END EVENTS LIST FOR ${band.toUpperCase()} =====`);
      out += `\n===== END EVENTS LIST FOR ${band.toUpperCase()} =====\n`;
      fs.appendFile('./ops/log.txt', out, error => {});
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
