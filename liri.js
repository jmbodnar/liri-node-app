const command = process.argv[2];

const { getBandInfo } = require('./ops/bands');
const { getSongInfo } = require('./ops/songs');

switch (command) {
  case 'concert-this':
    getBandInfo();
    break;
  case 'spotify-this-song':
    getSongInfo();
    break;
  default:
    console.log('Crap! Nothing worked.');
    break;
}
