const fs = require('fs');
const path = require('path');
function copyDir(srcDir) {
  const destDir = path.join(__dirname, 'files-copy');
  // Создаем папку files-copy
  fs.mkdir(destDir, { recursive: true }, (err) => {
    if (err) {
      console.error('Error creating folder:', err);
      return;
    } else console.log('Folder has been copied');
  });
  // Читаем содержимое исходной папки
  fs.readdir(srcDir, (err, srcfiles) => {
    if (err) {
      console.error('Error reading souce folder:', err);
      return;
    }
    // Читаем содержимое папки-копии
    fs.readdir(destDir, (err, destfiles) => {
      if (err) {
        console.error('Error reading destination folder:', err);
        return;
      }
      // Проверяем на наличие, и удаляем файлы из destDir, которых нет в srcDir
      destfiles.forEach((file) => {
        if (!srcfiles.includes(file)) {
          const destPath = path.join(destDir, file); // Путь к файлу в скопированной папке
          fs.unlink(destPath, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
            } else {
              console.log(`File ${file} has been deleted from files-copy`);
            }
          });
        }
      });
      // Копируем файлы из srcDir в destDir
      srcfiles.forEach((file) => {
        const srcPath = path.join(srcDir, file); // Путь к файлу в исходной папке
        const destPath = path.join(destDir, file); // Путь к файлу в скопированной папке
        fs.stat(srcPath, (err, stats) => {
          if (err) {
            console.error('Error getting file information:', err);
            return;
          }
          // Проверка на файл в srcDir
          if (stats.isFile()) {
            fs.copyFile(srcPath, destPath, (err) => {
              if (err) {
                console.error('Error copying file:', err);
              } else {
                console.log(`File ${file} has been copied to files-copy`);
              }
            });
          }
        });
      });
    });
  });
}
const pathToInitialFolder = path.join(__dirname, 'files');
copyDir(pathToInitialFolder);
