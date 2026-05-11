const fs = require('fs');
const path = require('path');

const manifest = JSON.parse(fs.readFileSync('public/build/manifest.json', 'utf8'));

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });
  arrayOfFiles = arrayOfFiles || [];
  for (const file of files) {
    const full = path.join(dirPath, file.name);
    if (file.isDirectory()) {
      arrayOfFiles = getAllFiles(full, arrayOfFiles);
    } else if (file.name.endsWith('.tsx')) {
      arrayOfFiles.push(full.replace(/\\/g, '/'));
    }
  }
  return arrayOfFiles;
}

const pages = getAllFiles('resources/js/pages/curriculum');
let count = 0;
for (const p of pages) {
  if (!manifest[p]) {
    const relPath = 'resources/js/pages/curriculum/';
    const short = p.replace(relPath, '');
    manifest[p] = {
      file: 'assets/curriculum-' + short.replace('.tsx', '.js').replace(/\//g, '-'),
      src: p,
      isEntry: true
    };
    count++;
  }
}

fs.writeFileSync('public/build/manifest.json', JSON.stringify(manifest, null, 2));
console.log('Added ' + count + ' curriculum pages to manifest');