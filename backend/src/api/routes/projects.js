const express = require('express');
const router = express.Router();
const Project = require('../../models/project/Project');

// Obtenir tous les projets
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ updatedAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Créer un nouveau projet
router.post('/', async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      description: req.body.description,
      path: req.body.path,
      settings: req.body.settings
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mettre à jour un projet
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          path: req.body.path,
          settings: req.body.settings
        }
      },
      { new: true }
    );
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;