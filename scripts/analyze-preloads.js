const fs = require('fs');
const path = require('path');

const NEXT_DIR = path.join(__dirname, '../.next/server/app');

function getAllHtmlFiles(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;

    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            getAllHtmlFiles(filePath, fileList);
        } else if (path.extname(file) === '.html') {
            fileList.push(filePath);
        }
    });

    return fileList;
}

function analyzeFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const preloadRegex = /<link[^>]+rel="preload"[^>]*>/g;
    const matches = content.match(preloadRegex);

    if (matches) {
        console.log(`\nFile: ${path.relative(process.cwd(), filePath)}`);
        matches.forEach(tag => {
            console.log(`  - ${tag}`);
        });
    }
}

console.log('Analyzing build output for preload tags...');
const htmlFiles = getAllHtmlFiles(NEXT_DIR);

if (htmlFiles.length === 0) {
    console.log('No HTML files found in .next/server/app. Make sure you have run "npm run build".');
} else {
    htmlFiles.forEach(analyzeFile);
}
