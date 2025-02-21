const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('NOVA Project Structure:');
console.log('======================');

const EXCLUDED_DIRS = ['node_modules', '.git', 'dist', 'coverage', '.cache'];

function listFiles(dir = '.', indent = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (EXCLUDED_DIRS.includes(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      console.log(`${indent}📁 ${entry.name}/`);
      listFiles(fullPath, indent + '  ');
    } else {
      console.log(`${indent}📄 ${entry.name}`);
    }
  }
}

try {
  listFiles('.');
  console.log('======================');
  console.log('Note: Excluding node_modules, .git, dist, coverage, and .cache directories');
} catch (error) {
  console.error('Error listing structure:', error);
  process.exit(1);
}
