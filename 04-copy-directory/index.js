const fs = require('node:fs/promises');
const path = require('path');

const folder = 'files';
const newFolder = 'files-copy';

async function copyDir(source, dest) {

  try {
    await fs.rm(dest, { recursive: true, force: true});
    await fs.mkdir(dest, { recursive: true });
  } catch (error) {
    console.error('Error creating directory:', error);
    return;
  }

  const files = await fs.readdir(source);

  for (const file of files) {

    const sourceFile = path.join(source, file);
    const destFile = path.join(dest, file);
    const fileStat = await fs.stat(sourceFile);

    if (fileStat.isDirectory()) {

      await copyDir(sourceFile, destFile);

    } else {

      const content = await fs.readFile(sourceFile);
      await fs.writeFile(destFile, content);
      console.log(`${destFile} скопировано.`);
    }
  }
}

const source = path.join(__dirname, folder);
const dest = path.join(__dirname, newFolder);

copyDir(source, dest);