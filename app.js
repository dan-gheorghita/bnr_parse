const fs = require('fs');
const reqXml = require('./request.js');
const xml2jsF = require('./xml2js.js');

reqXml.requestXML();
xml2jsF.convertxml2json();

const {google} = require('googleapis');
const path = require('path');

const { file } = require('googleapis/build/src/apis/file');

const CLIENT_ID ='967205067013-jdkus19edmu8cbc91a4r7jr8b69fighn.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04Hx8z8wdpzXeCgYIARAAGAQSNwF-L9Ir27nTH7q2A86EBkj6WNhOxxmsoj_P6hInMEP5g5u9JMCqVJUXdvGqZGWh0D1PaCJNhlI';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive = google.drive({
    version : 'v3',
    auth : oauth2Client
});

// const filePath = path.join(__dirname,'SuperMarioHub.jpg');

// async function uploadFile(){
//     try {
//         const response = await drive.files.create({
//             requestBody : {
//                 name : 'mario.jpg',
//                 mimeType : 'image/jpg'
//             },
//             media: {
//                 mimeType : 'image/jpg',
//                 body : fs.createReadStream(filePath)
//             }
//         });
//         data1 = response.data;
//         console.log(response.data);
//     } catch (error) {
//         console.log(error.message);
//     }
// }

//uploadFile();
const json = 'nbrfxrates.json';
let fileId = '';
async function uploadFile1(){
    try {
        const response = await drive.files.create({
            requestBody : {
                name : 'nbrfxrates.json',
                mimeType : 'text/plain'
            },
            media: {
                mimeType : 'text/plain',
                body : fs.createReadStream(json)
            }
        });
        console.log(response.data);
        return(response.data.id);
    } catch (error) {
        console.log(error.message);
    }
}

fileId = uploadFile1();
console.log(fileId);

async function generatePublicURL(){
    try {
        await drive.permissions.create({
            fileId : fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        });
        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink'
        });
        console.log(result.data);
    } catch (error) {
        console.log(error.message);
    }
}

generatePublicURL();