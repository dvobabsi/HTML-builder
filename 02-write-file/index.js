const fs = require('fs');
const os = require('os');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const file = path.join(__dirname, 'text.txt');
const fileText = fs.createWriteStream(file);
const transfer = os.EOL;

readline.emitKeypressEvents(process.stdin);

rl.write('Привет!' + transfer);
rl.write('Ввводи побыстрее...' + transfer);

rl.on('line', (data) => {
  const isExit = data.toString().trim() === 'exit';
  if (!isExit) {
    fileText.write(data + transfer);
  } else {
    rl.close();
  }
});

rl.on('close', () => console.log('Конец! Загляни в text.txt' + transfer + 'Удачи тебе!'));
