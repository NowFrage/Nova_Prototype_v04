const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Configuration
const MAX_FILE_LINES = 400;
const EXCLUDED_DIRS = ['node_modules', '.git', 'dist', 'coverage', '.cache'];

async function validateFileSize(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    const lines = content.split('\n').length;

    if (lines > MAX_FILE_LINES) {
      console.warn(`⚠️ Warning: ${filePath} has ${lines} lines (exceeds ${MAX_FILE_LINES} limit)`);
      return false;
    }
    return true;
  } catch (error) {
    console.error(`❌ Error reading ${filePath}:`, error.message);
    return false;
  }
}

async function validateStructure(dir = '.') {
  let isValid = true;

  try {
    const entries = await readdir(dir);

    for (const entry of entries) {
      if (EXCLUDED_DIRS.includes(entry)) continue;

      const fullPath = path.join(dir, entry);
      const stats = await stat(fullPath);

      if (stats.isDirectory()) {
        const subDirValid = await validateStructure(fullPath);
        isValid = isValid && subDirValid;
      } else if (stats.isFile() && entry.match(/\.(js|ts|jsx|tsx)$/)) {
        const fileValid = await validateFileSize(fullPath);
        isValid = isValid && fileValid;
      }
    }
  } catch (error) {
    console.error(`❌ Error scanning directory ${dir}:`, error.message);
    return false;
  }

  return isValid;
}

// Exécution principale
console.log('🔍 Validating project structure...');
validateStructure()
  .then((isValid) => {
    if (isValid) {
      console.log('✅ Project structure validation passed');
      process.exit(0);
    } else {
      console.error('❌ Project structure validation failed');
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('❌ Validation error:', error);
    process.exit(1);
  });
