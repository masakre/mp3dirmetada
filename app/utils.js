const fs = require('fs');
const path = require('path');
const mm = require('music-metadata');

// CONFIG
const supportedFileTypes = ['.mp3', '.wav', '.ogg', '.m4a', '.flac', '.ogg', '.wma', '.aac', '.mp2', '.mp1', '.oga', '.opus', '.wv', '.webm', '.mka', '.spx', '.ape'];

// FUNCTIONS
async function scanDir4audioFiles(dirPath) {

  if (!fs.lstatSync(dirPath).isDirectory()) {
    console.log(dirPath + ' is not a valid directory');
    return;
  }

  await handleDirFiles(dirPath);
}


async function handleDirFiles(dirPath) {
  const files = fs.readdirSync (dirPath);

  for (file of files) {

    file = dirPath + '/' + file;

    if (fs.lstatSync(file).isFile() && supportedFileTypes.includes(path.extname(file))) {
      await handleAudioFile(file);
    }

    if (fs.lstatSync(file).isDirectory()) {
      console.log('DIRECTORY DETECTED', file);
      await handleDirFiles(file);
    }

  }
}


async function handleAudioFile(filePath) {
  return mm.parseFile(filePath)
    .then(metadata => {
      console.log('>> Music file detected ', filePath);
      console.log('>>>> metadata', metadata);
      // console.log('metadata util.inspect', util.inspect(metadata, { showHidden: false, depth: null }));

      const fileName = (metadata.format.trackInfo.length) ? JSON.stringify(metadata.format.trackInfo) : path.basename(filePath);
      console.log('>>>> filename', fileName);
      console.log('');


    }, err => {
      console.error('!handleAudioFile Error', {
        message: err.message,
        file: filePath,
        err: err
      });
      console.log('');
    });
}


module.exports.scanDir4audioFiles = scanDir4audioFiles;
