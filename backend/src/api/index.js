const express = require('express');
const router = express.Router();

// Importer les routes
const chatRoutes = require('./routes/chat');
const projectRoutes = require('./routes/projects');
const memoryRoutes = require('./routes/memory');

// Monter les routes
router.use('/chat', chatRoutes);
router.use('/projects', projectRoutes);
router.use('/memory', memoryRoutes);

module.exports = router;