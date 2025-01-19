const fs = require('fs');
const path = require('path');
const pathToFile = path.join(__dirname, 'text.txt');
fs.readFile(pathToFile, 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('file content:', data);
});
