const fs = require('fs');
const path = require('path');
const os = require('os');
const utils = require('./utils');

console.log(' mp3DirMetadata says hello! ');

const musicFolder = process.argv[2]  || ( os.type() === 'Darwin' ) ? 
                                          '/Users/luis/Downloads' :
                                          '/home/luis/Música/DANI/Zanthrax- Lost heritage';

if ( !fs.lstatSync(musicFolder).isDirectory() ) {
  console.error( 'provided music folder is not a directory', musicFolder);
  return;
}


utils.scanDir4audioFiles(musicFolder);

