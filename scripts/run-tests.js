const { spawnSync } = require('child_process');
const path = require('path');

// Configuration
const config = {
  jest: {
    config: path.join(__dirname, '..', 'jest.config.js'),
    coverage: true
  }
};

console.log('📋 Starting test suite...');
console.log('🧪 Running tests with Jest...');

// Exécuter Jest directement depuis node_modules
const args = ['--config', config.jest.config, config.jest.coverage ? '--coverage' : ''].filter(
  Boolean
);

const result = spawnSync('npx', ['jest', ...args], {
  stdio: 'inherit',
  shell: true
});

if (result.status === 0) {
  console.log('✅ Tests completed successfully');
  process.exit(0);
} else {
  console.error('❌ Tests failed');
  process.exit(1);
}
