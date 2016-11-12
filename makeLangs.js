/* jshint node:true, esnext: true */
const fs = require('fs');

let main = fs.readFileSync('src/index.html', 'utf8');

main = main
	.replace(/<html lang="en">/, '<html lang="no">')
	.replace(/class="selected" /, '')
	.replace(/<a id="no" lang="no" href="no.html"/, '<a id="no" lang="no" class="selected" href="no.html"');

fs.writeFileSync('src/no.html', main);
