/** @type {import('jest').Config} */
module.exports = {
  // Répertoires racines pour la recherche de tests
  roots: ['<rootDir>/tests', '<rootDir>/backend/tests', '<rootDir>/frontend/tests'],

  // Environnement de test
  testEnvironment: 'node',

  // Pattern pour trouver les fichiers de test
  testMatch: [
    '**/__tests__/**/*.js',
    '**/*.test.js',
    '**/*.spec.js',
    '**/integration/**/*.test.js'
  ],

  // Ignorer certains dossiers
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],

  // Configuration de la couverture de code
  collectCoverage: true,
  collectCoverageFrom: [
    'backend/src/**/*.js',
    'frontend/src/**/*.js',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover'],

  // Seuils de couverture minimale (0% pour l'instant, à augmenter plus tard)
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },

  // Afficher les détails dans la console
  verbose: true
};
