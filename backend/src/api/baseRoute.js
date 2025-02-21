const express = require('express');
const router = express.Router();

/**
 * @route GET /api/health
 * @desc Health check endpoint
 * @access Public
 */
router.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

module.exports = router;
