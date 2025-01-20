const fs = require('fs');
const path = require('path');
const stylesFolder = path.join(__dirname, 'styles');
const bundleFile = path.join(__dirname, 'project-dist', 'bundle.css'); //Создаем файл bundle.css
fs.readdir(stylesFolder, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }
  const onlyCssFiles = files.filter((file) => path.extname(file) === '.css'); //Берем только файлы с расширением .css
  const writeStream = fs.createWriteStream(bundleFile, 'utf-8');
  onlyCssFiles.forEach((file) => {
    const filePath = path.join(stylesFolder, file);
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
      writeStream.write(data + '\n'); //Записываем стили в bundle с переносом строки
      console.log(`File ${file} added to bundle.css in project-dist folder`);
    });
  });
});
