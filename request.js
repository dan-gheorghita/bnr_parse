const https = require('node:https');
const fs = require("fs");

function requestXML(){

  const postData = JSON.stringify({
    'msg': 'Hello World!',
  });
  
  const req = https.request('https://www.bnr.ro/nbrfxrates.xml', (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      fs.writeFile('nbrfxrates.xml', chunk, function (err) {
      if (err) throw err;
      console.log('Saved xml!');
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
  req.end(); 
}

module.exports.requestXML = requestXML;