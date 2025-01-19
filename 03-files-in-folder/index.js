const fs = require('fs');
const path = require('path');
const pathToFile = path.join(__dirname, 'secret-folder');
fs.readdir(pathToFile, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }
  files.forEach((file) => {
    const filePath = path.join(pathToFile, file);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error('Error getting file information:', err);
        return;
      }
      if (stats.isFile()) {
        const fileName = path.parse(file).name; // Имя файла без расширения
        const fileExt = path.extname(file).slice(1); // Расширение файла
        const fileSize = stats.size / 1024; // Размер файла в KB
        console.log(`${fileName} - ${fileExt} - ${fileSize}kb`);
      }
    });
  });
});
