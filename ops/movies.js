// www.omdbapi.com/?apikey=trilogy&t="Star Wars"

const axios = require('axios');

let [command, ...movie] = process.argv.slice(2);
movie = movie
  .join(' ')
  .trim()
  .toLowerCase();

console.log('MOVIE IS', movie);
// .get(`www.omdbapi.com/?apikey=trilogy&t=${movie}`)

const getMovieInfo = () => {
  return axios
    .get(
      `https://www.omdbapi.com/?apikey=trilogy&t=${encodeURIComponent(movie)}`
    )
    .then(response => {
      console.log(`\n===== INFO FOR "${movie.toUpperCase()}" =====\n`);
      console.log('\tTITLE:', response.data.Title);
      console.log('\tRELEASED:', response.data.Year);
      console.log('\tRATINGS:');

      response.data.Ratings.forEach(rating => {
        console.log(`\t * ${rating.Source.toUpperCase()}: ${rating.Value}`);
      });
      // console.log(response.data);
      console.log('\tCOUNTRY:', response.data.Country);
      console.log('\tLANGUAGE:', response.data.Language);
      console.log('\tPLOT:', response.data.Plot);
      console.log('\tACTORS:', response.data.Actors);
      console.log(`\n===== END INFO FOR "${movie.toUpperCase()}" =====\n`);
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
