const fs = require('fs');

const readStream = fs.createReadStream('./notes.txt', {encoding: 'utf8'});
const writeStream = fs.createWriteStream('./notes1.txt');

/*readStream.on('data', (chunck)=>{
    console.log('---new chunck----');
    console.log(chunck);
    writeStream.write('\nNewChunck\n');
    writeStream.write(chunck);
});
*/
//pipes must be used from a readable to a writeable 

readStream.pipe(writeStream);