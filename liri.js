require('dotenv').config();
const keys = require('./keys.js');
const axios = require('axios');

const [command, value, three, four, five] = process.argv.slice(2);

const getBandInfo = () => {
  return axios
    .get(
      `https://rest.bandsintown.com/artists/${value}/events?app_id=codingbootcamp`
    )
    .then(response => {
      console.log(`\n===== EVENTS LIST FOR ${value.toUpperCase()} =====\n`);
      response.data.forEach(event => {
        const date = new Date(event.datetime);
        let datestring = `${String(date.getMonth()).padStart(
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
      console.log(`\n===== END EVENTS LIST FOR ${value.toUpperCase()} =====`);
    });
};

switch (command) {
  case 'concert-this':
    getBandInfo();
    break;
  default:
    console.log("Fuck. It didn't work");
}

// to access keys information...
// var spotify = new Spotify(keys.spotify);

// axios
//   .get('https://en.wikipedia.org/wiki/Kudos_(granola_bar)')
//   .then(function(response) {
//     // If the axios was successful...
//     // Then log the body from the site!
//     console.log(response.data);
//   })
//   .catch(function(error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else if (error.request) {
//       // The request was made but no response was received
//       // `error.request` is an object that comes back with details pertaining to the error that occurred.
//       console.log(error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log('Error', error.message);
//     }
//     console.log(error.config);
//   });
