const fs = require('fs');
//const fsPromises = require('fs/promises');
const { Transform } = require('stream');
//const ACCESS_LOG = 'https://drive.google.com/file/d/1A8B0eDEagkO6XlpJAinsk8_9qQTsnVly/view/access.log';
const ACCESS_LOG = './access.log';
const OUT89_LOG = './%89.123.1.41%_requests.log';
const OUT34_LOG = './%34.48.240.111%_requests.log';

// ------------------------------
const write89Stream = fs.createWriteStream(OUT89_LOG, {
    flags: 'a',
    encoding: 'utf-8',
});

const write34Stream = fs.createWriteStream(OUT34_LOG, {
    flags: 'a',
    encoding: 'utf-8',
});

const readStream = fs.createReadStream(ACCESS_LOG, {
    flags: 'r',
    encoding: 'utf-8',
});

readStream.on('data', (chunk) => {
    readStream.read('\n');    
    const log = chunk.toString().split('\n');
    for (i in log) {        
        if (log[i].includes("89.123.1.41") === true) {                             
            write89Stream.write('\n');
            write89Stream.write(log[i]);
        };
        if (log[i].includes("34.48.240.111") === true) {                             
            write34Stream.write('\n');
            write34Stream.write(log[i]);
        };
    }        
});





