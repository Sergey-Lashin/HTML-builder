const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const outputPath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(outputPath);
stdout.write(
  `Hello, to write information to a new text file, enter the text below.
  *Each input will be added to the file on a new line.\n`,
);
stdin.on('data', (data) => {
  const text = data.toString().trim();
  if (text.toLowerCase() === 'exit') {
    stdout.write('Goodbye! Thank you for using the program!\n');
    process.exit();
  }
  output.write(`${text}\n`);
});
process.on('SIGINT', () => {
  stdout.write('\nGoodbye! Thank you for using the program!\n');
  process.exit();
});
