const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['user', 'assistant', 'system'],
    required: true
  },
  modelId: {
    type: String,
    required: true
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  }
});

module.exports = mongoose.model('Message', messageSchema);