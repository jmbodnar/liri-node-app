const fs = require('fs');

let exec = require('child_process').exec,
  child;

const getRandomItem = arr => {
  let randItem = Math.floor(Math.random() * arr.length);
  return arr[randItem].split(',');
};

const getRandomInfo = () => {
  fs.readFile('./random.txt', 'utf8', function(error, contents) {
    if (error) {
      console.log(error);
    } else {
      let out = '';
      const commandsList = contents.split(/\n/);
      let command = getRandomItem(commandsList);
      child = exec(`node liri.js ${command[0]} ${command[1]}`, function(
        error,
        stdout,
        stderr
      ) {
        console.log('Okay, got them. Now executing command to ' + stdout);
        out += stdout;
        if (stderr !== '') {
          console.log('stderr: ' + stderr);
        }
        if (error !== null) {
          console.log('exec error: ' + error);
        }
        fs.appendFile('./ops/log.txt', out, error => {});
      });
    }
  });
};

module.exports = { getRandomInfo };
