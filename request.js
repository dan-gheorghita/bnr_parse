const https = require('node:https');
const fs = require("fs");

const postData = JSON.stringify({
  'msg': 'Hello World!',
});

const options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
  },
};

const req = https.request('https://www.bnr.ro/nbrfxrates.xml', (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    fs.writeFile('nbrfxrates.xml', chunk, function (err) {
    if (err) throw err;
    console.log('Saved!');
  }); 
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.write(postData);
console.log(postData);
req.end(); 