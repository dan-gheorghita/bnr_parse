const xml2js = require('xml2js')
const fs = require("fs");

function convertxml2json(){

    fs.readFile('nbrfxrates.xml', function (err, data) {
        xml2js.parseString(data, function (err, result) {
            // `result` is a JavaScript object
            // convert it to a JSON string
            const json = JSON.stringify(result, null, 4)
    
            fs.writeFile('nbrfxrates.json', json, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
    
        });
    });
    
}

module.exports.convertxml2json = convertxml2json;