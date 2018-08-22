#!/user/bin/env node
const md2c = require('../dist/index.js').default;

const path = require('path').resolve(process.cwd(), process.argv[2]);
const text = require('fs').readFileSync(path, 'utf-8');

require('clipboardy').write(md2c(text));