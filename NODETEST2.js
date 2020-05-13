const fs = require('fs');
const path = require('path');

const filePath = path.join(
  '/',
  'Users',
  'jdcas',
  'jdc-web',
  'zero-markdown-editor',
  'data',
  'test.md'
);

// ? include 'utf8' to draw contents as string.
const contents = fs.readFileSync(filePath, 'utf8');
console.log(contents);
