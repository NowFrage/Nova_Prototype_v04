const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  context: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active'
  }
});

// Mettre à jour updatedAt avant chaque sauvegarde
conversationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Conversation', conversationSchema);