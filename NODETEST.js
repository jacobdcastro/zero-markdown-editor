const fs = require('fs');
const path = require('path');

const folderPath = '/Users/jdcas/jdc-web/zero-markdown-editor/data';

const umm = fs.readdirSync(folderPath);
const filePath = folderPath + '/' + umm[0];
console.log(filePath);
const file = fs.readFileSync(filePath);
console.log(file);
