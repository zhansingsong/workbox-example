// Inside of build.js:
const {generateSW} = require('workbox-build');
const {join} = require('path');

const swDest = 'build/sw.js';
generateSW({
  swDest,
  globDirectory: process.cwd(),
  mode: 'development',
  // Other configuration options...
}).then(({count, size}) => {
  console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
});