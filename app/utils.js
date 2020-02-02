const fs = require('fs');
const path = require('path');
const mm = require('musicmetadata');
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

      file = dirPath +'/'+ file;

      if (fs.lstatSync(file).isFile() && supportedFileTypes.includes(path.extname(file))) {
        handleAudioFile(file);
      }
      
      if ( fs.lstatSync(file).isDirectory() ) {
        console.log( 'DIRECTORY DETECTED' , file);        
      }
      
    });
  }
  
  
  
  function handleAudioFile(filePath) 
  {
    var parser = mm(fs.createReadStream(filePath), function (err, metadata) {
      if (err) throw err;

      console.log(filePath + ' metadata:',  metadata);
    });
    // mm.parseFile(filePath)
    // .then(metadata => {
    //     console.log('>> Music file detected ', filePath);
    //     console.log('>>>> metadata', metadata);        
    //     // console.log('metadata util.inspect', util.inspect(metadata, { showHidden: false, depth: null }));

    //     const fileName =  ( metadata.format.trackInfo.length ) ? JSON.stringify(metadata.format.trackInfo) : path.basename(filePath);
    //     console.log( '>>>> filename', fileName);
    //     console.log('');


    //   })
    //   .catch(err => {
    //     console.error('!handleAudioFile Error', { 
    //       message: err.message,
    //       file: filePath,
    //       err:err
    //     });
    //     console.log('');
    //   });
  }

  
module.exports.scanDir4audioFiles = scanDir4audioFiles;