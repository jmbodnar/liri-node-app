const command = process.argv[2];

const { getBandInfo } = require('./ops/bands');
const { getSongInfo } = require('./ops/songs');
const { getMovieInfo } = require('./ops/movies');
const { getRandomInfo } = require('./ops/random');

switch (command) {
  case 'concert-this':
    console.log('get concert information...');
    getBandInfo();
    break;
  case 'spotify-this-song':
    console.log('get song information...');
    getSongInfo();
    break;
  case 'movie-this':
    console.log('get movie information...');
    getMovieInfo();
    break;
  case 'do-what-it-says':
    console.log('Getting my orders. One second...');
    getRandomInfo();
    break;
  default:
    console.log('Crap! Nothing worked.');
    break;
}
