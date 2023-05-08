const fs = require('node:fs/promises');
const path = require('path');

const folder = path.resolve(__dirname, 'secret-folder');

async function getStat() {
  try {
    const files = await fs.readdir(folder, { withFileTypes: true });
    
    for (const file of files) {
      if (file.isFile()) {
        const name = path.parse(file.name).name;
        const ext = path.parse(file.name).ext.replace('.', '');
        const info = await fs.stat(path.join(folder, file.name));
        console.log('\x1b[37m', name, '-', ext, '-', formatSize(info.size));
      }
    }
  } catch (err) {
    console.error(err);
  }
}

function formatSize(size) {
  const unit = ['byte', 'KiB', 'MiB', 'GiB'];
  let i = 0;
  size = Number(size);
  for (let i = 0; i < unit.length - 1; i++) {
    if (size >= 1024) {
      size /= 1024;
      i++;
    }
  }
  size = unit[i] === 'byte' ? size : size.toFixed(3);
  return size + unit[i];
}

getStat();