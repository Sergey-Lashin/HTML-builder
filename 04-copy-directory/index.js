const fs = require('fs');
const path = require('path');
function copyDir(srcDir) {
  const destDir = path.join(__dirname, 'files-copy');
  fs.mkdir(destDir, { recursive: true }, (err) => {
    if (err) {
      console.error('Error creating folder:', err);
      return;
    } else console.log('Folder has been copied');
  });
  fs.readdir(srcDir, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      return;
    }
    files.forEach((file) => {
      const srcPath = path.join(srcDir, file); // Путь к файлу в исходной папке
      const destPath = path.join(destDir, file); // Путь к файлу в скопированной папке
      fs.stat(srcPath, (err, stats) => {
        if (err) {
          console.error('Error getting file information:', err);
          return;
        }
        if (stats.isFile()) {
          fs.copyFile(srcPath, destPath, (err) => {
            if (err) {
              console.error('Error copying file:', err);
            } else {
              console.log(`File ${file} has been copied`);
            }
          });
        }
      });
    });
  });
}
const pathToInitialFolder = path.join(__dirname, 'files');
copyDir(pathToInitialFolder);
