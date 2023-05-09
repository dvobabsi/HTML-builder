const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

const bandle = path.join(__dirname, 'project-dist/bundle.css');
const style = path.join(__dirname, 'styles');

const writableStream = fs.createWriteStream(bandle, 'utf-8');

readdir(style, { withFileTypes: true }).then((files) => {
  files.forEach((file) => {
    const fileName = path.join(__dirname, 'styles', file.name);

    if (file.isFile() && path.extname(fileName) === '.css') {
      const readableStream = fs.createReadStream(fileName, 'utf8');
      readableStream.on('data', (data) => writableStream.write(data));
    }
  });
});