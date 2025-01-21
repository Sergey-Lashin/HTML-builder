const fs = require('fs');
const path = require('path');
const pathToFile = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(pathToFile, 'utf-8');
readStream.on('error', (err) => {
  console.error('Error reading file:', err);
});
readStream.on('data', (chunk) => {
  console.log('file content:', chunk);
});
readStream.on('end', () => {
  console.log('File reading completed');
});
