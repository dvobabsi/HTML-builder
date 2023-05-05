const fs = require('fs');

const stream = new fs.ReadStream('01-read-file/text.txt', {encoding: 'utf-8'});

stream.on('readable', function(){
  const data = stream.read();
  // console.log(data);
  if(data != null)console.log(data);
});

stream.on('error', function(err){
  if(err.code == 'ENOENT'){
    console.log('Файл не найден');
  }else{
    console.error(err);
  }
});