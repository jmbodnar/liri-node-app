require('dotenv').config();
const keys = require('../keys');

const fs = require('fs');

const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
let song_title = process.argv
  .slice(3)
  .join(' ')
  .trim()
  .toLowerCase();

if (!song_title) song_title = 'The Sign';

const getSongInfo = () => {
  return spotify
    .search({ type: 'track', query: song_title, limit: '1' })
    .then(response => {
      let out = '';
      console.log(
        `\n===== SONG DATA FOR "${song_title.toUpperCase()}" =====\n`
      );
      out += `\n===== SONG DATA FOR "${song_title.toUpperCase()}" =====\n\n`;
      console.log('\tSong Title:', song_title);
      out += '\tSong Title:' + song_title + '\n';
      console.log('\tArtist Name:', response.tracks.items[0].artists[0].name);
      out +=
        '\tArtist Name: ' + response.tracks.items[0].artists[0].name + '\n';
      console.log('\tPreview URL:', response.tracks.items[0].preview_url);
      out += '\tPreview URL:' + response.tracks.items[0].preview_url + '\n';
      console.log('\tAlbum Title:', response.tracks.items[0].album.name);
      out += '\tAlbum Title: ' + response.tracks.items[0].album.name + '\n';
      console.log(
        `\n===== END SONG DATA FOR "${song_title.toUpperCase()}" =====\n`
      );
      out += `\n===== END SONG DATA FOR "${song_title.toUpperCase()}" =====\n\n`;

      fs.appendFile('./ops/log.txt', out, error => {});
    })
    .catch(error => {
      console.log("\tSorry. We didn't find any information for that song.");
      console.log(
        `\n===== END SONG DATA FOR "${song_title.toUpperCase()}" =====\n`
      );
    });
};

module.exports = { getSongInfo };
