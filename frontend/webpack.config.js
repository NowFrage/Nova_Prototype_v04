const path = require('path');

module.exports = {
  // Configuration webpack de base
  webpack: {
    configure: (webpackConfig) => {
      return webpackConfig;
    },
  },
  // Configuration du serveur de développement
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      // Middleware personnalisé ici si nécessaire
      
      return middlewares;
    },
    port: 3000,
    hot: true,
    open: true,
  },
};