const fs = require('fs');

const axios = require('axios');

let [command, ...movie] = process.argv.slice(2);
movie = movie
  .join(' ')
  .trim()
  .toLowerCase();

if (!movie) movie = 'Mr Nobody';

const getMovieInfo = () => {
  return axios
    .get(
      `https://www.omdbapi.com/?apikey=trilogy&t=${encodeURIComponent(movie)}`
    )
    .then(response => {
      let out = '';
      console.log(`\n===== INFO FOR "${movie.toUpperCase()}" =====\n`);
      out += `\n===== INFO FOR "${movie.toUpperCase()}" =====\n\n`;
      console.log('\tTITLE:', response.data.Title);
      out += '\tTITLE: ' + response.data.Title + '\n';
      console.log('\tRELEASED:', response.data.Year);
      out += '\tRELEASED: ' + response.data.Year + '\n';
      console.log('\tRATINGS:');
      out += '\tRATINGS:\n';

      response.data.Ratings.forEach(rating => {
        console.log(`\t * ${rating.Source.toUpperCase()}: ${rating.Value}`);
        out += `\t * ${rating.Source.toUpperCase()}: ${rating.Value}\n`;
      });
      // console.log(response.data);
      console.log('\tCOUNTRY:', response.data.Country);
      out += '\tCOUNTRY: ' + response.data.Country + '\n';
      console.log('\tLANGUAGE:', response.data.Language);
      out += '\tLANGUAGE: ' + response.data.Language + '\n';
      console.log('\tPLOT:', response.data.Plot);
      out += '\tPLOT: ' + response.data.Plot + '\n';
      console.log('\tACTORS:', response.data.Actors);
      out += '\tACTORS: ' + response.data.Actors + '\n';
      console.log(`\n===== END INFO FOR "${movie.toUpperCase()}" =====\n`);
      out += `\n===== END INFO FOR "${movie.toUpperCase()}" =====\n\n`;

      fs.appendFile('./ops/log.txt', out, error => {});
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
};

module.exports = { getMovieInfo };
