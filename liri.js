// require('dotenv').config();
// const keys = require('./keys.js');

const command = process.argv[2];
const { getBandInfo } = require('./ops/bands');

switch (command) {
  case 'concert-this':
    getBandInfo();
    break;
  default:
    console.log('Crap! Nothing worked.');
}
