const express = require('express');
const path = require('path');
const baseRoute = require('./src/api/baseRoute');

function createApp() {
  const app = express();
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS middleware
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });

  // Routes
  app.use('/api', baseRoute);

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    });
  });

  return app;
}

const app = createApp();
const PORT = process.env.PORT || 5000; // Changé à 5000 par défaut

// Only start the server if this file is run directly (not required as a module)
if (require.main === module) {
  const server = app
    .listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check endpoint: http://localhost:${PORT}/api/health`);
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please try running 'npm run clear-ports' to free it up.`);
        process.exit(1);
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });

  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    console.info('SIGTERM signal received. Closing server...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
}

module.exports = app;
