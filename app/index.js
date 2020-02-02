const fs = require('fs');
const path = require('path');
const utils = require('./utils');

console.log(' mp3DirMetadata says hello! ');

const musicFolder = '/home/luis/Música/';

utils.scanDir4audioFiles(musicFolder);

