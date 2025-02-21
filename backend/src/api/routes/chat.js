const express = require('express');
const router = express.Router();
const Message = require('../../models/chat/Message');
const Conversation = require('../../models/chat/Conversation');

// Obtenir toutes les conversations
router.get('/conversations', async (req, res) => {
  try {
    const conversations = await Conversation.find()
      .sort({ updatedAt: -1 })
      .limit(20);
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Créer une nouvelle conversation
router.post('/conversations', async (req, res) => {
  try {
    const conversation = new Conversation({
      title: req.body.title,
      projectId: req.body.projectId,
      context: req.body.context
    });
    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Envoyer un message
router.post('/messages', async (req, res) => {
  try {
    const message = new Message({
      content: req.body.content,
      role: req.body.role,
      modelId: req.body.modelId,
      conversationId: req.body.conversationId
    });
    await message.save();
    
    // Mettre à jour la conversation
    await Conversation.findByIdAndUpdate(
      req.body.conversationId,
      { $set: { updatedAt: new Date() } }
    );
    
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtenir les messages d'une conversation
router.get('/conversations/:conversationId/messages', async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;