const command = process.argv[2];

const { getBandInfo } = require('./ops/bands');
const { getSongInfo } = require('./ops/songs');
const { getMovieInfo } = require('./ops/movies');

switch (command) {
  case 'concert-this':
    console.log('Getting concert information...');
    getBandInfo();
    break;
  case 'spotify-this-song':
    console.log('Getting song information...');
    getSongInfo();
    break;
  case 'movie-this':
    console.log('Getting movie information...');
    getMovieInfo();
    break;
  // TODO: Add `node liri.js do-what-it-says`
  /* 
  case 'do-what-it-says':
    console.log("Getting my orders. One second...");
    break;
  */
  default:
    console.log('Crap! Nothing worked.');
    break;
}
