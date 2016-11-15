/* jshint node:true, esnext: true */
const fs = require('fs');
const cheerio = require('cheerio');

const main = fs.readFileSync('src/index.html', 'utf8');
const $ = cheerio.load(main);

$('#en').removeClass('selected');
$('#no').addClass('selected');
$('html').attr('lang', 'no');

fs.writeFileSync('src/no.html', $.html());
