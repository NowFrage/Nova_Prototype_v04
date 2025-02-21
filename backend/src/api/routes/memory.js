const express = require('express');
const router = express.Router();
const ContextualMemory = require('../../models/memory/ContextualMemory');

// Sauvegarder un élément de mémoire contextuelle
router.post('/', async (req, res) => {
  try {
    const memory = new ContextualMemory({
      projectId: req.body.projectId,
      type: req.body.type,
      content: req.body.content,
      metadata: req.body.metadata
    });
    await memory.save();
    res.status(201).json(memory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Récupérer la mémoire contextuelle d'un projet
router.get('/project/:projectId', async (req, res) => {
  try {
    const memories = await ContextualMemory.find({
      projectId: req.params.projectId
    })
    .sort({ timestamp: -1, relevance: -1 })
    .limit(req.query.limit || 20);
    res.json(memories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour la pertinence d'un élément de mémoire
router.patch('/:id/relevance', async (req, res) => {
  try {
    const memory = await ContextualMemory.findByIdAndUpdate(
      req.params.id,
      { $set: { relevance: req.body.relevance } },
      { new: true }
    );
    res.json(memory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;