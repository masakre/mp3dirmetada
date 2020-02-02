const fs = require('fs');
const path = require('path');
const mm = require('music-metadata');
const util = require('util')

// CONFIG
const supportedFileTypes = ['.mp3', '.wav', '.ogg', '.m4a']

// FUNCTIONS
function scanDir4audioFiles (dirPath) 
{

  if (!fs.lstatSync(dirPath).isDirectory()) {
    console.log(dirPath + ' is not a valid directory');
    return;
  }

  fs.readdir(dirPath, (err, files) => { handleDirFiles( err, files, dirPath) } );
}



function handleDirFiles (err, files, dirPath) 
{
  files.forEach(file => {

      file = dirPath + file;

      if (fs.lstatSync(file).isFile() && supportedFileTypes.includes(path.extname(file))) {
        console.log(' %c>> Music file detected ', 'color:yellow, font-size:13px', file);
        handleAudioFile(file);
        console.log('');
      }

      if ( fs.lstatSync(file).isDirectory() ) {
        console.log( 'DIRECTORY DETECTED' , file);        
      }
     
    });
  }



  function handleAudioFile(filePath) 
  {
    mm.parseFile(filePath)
      .then(metadata => {
        console.log('metadata', metadata);        
        // console.log('metadata util.inspect', util.inspect(metadata, { showHidden: false, depth: null }));

        if ( metadata.format.trackInfo.length ) {

        } else {
          
          const fileName = path.basename(filePath);

        }


      })
      .catch(err => {
        console.error(err.message);
      });
  }

  
module.exports.scanDir4audioFiles = scanDir4audioFiles;