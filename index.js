const fs = require('fs');
const path = require('path');

const main = require('./main');
const graphData = require('./data.json');

const program = fs.readFileSync(path.join(__dirname, './program'), 'utf8');

const resp = main(program, { INPUT: graphData });
const { INPUT, OUTPUT } = resp[0];
console.log('--------------SUCESS-----------------');
// console.log(rest);
console.log(JSON.stringify(OUTPUT, null, 2));
