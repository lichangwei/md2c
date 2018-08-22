#!/user/bin/env node
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const clipboardy = require('clipboardy');
const md2c = require('../dist/index.js').default;

assert(process.argv[2], 'Please input the markdown file path.')

const file = path.resolve(process.cwd(), process.argv[2]);
const text = fs.readFileSync(file, 'utf-8');

clipboardy.writeSync(md2c(text));

console.log('Confluence wiki markup copied.');
