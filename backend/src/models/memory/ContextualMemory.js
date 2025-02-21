const mongoose = require('mongoose');

const contextualMemorySchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  type: {
    type: String,
    enum: ['conversation', 'codeContext', 'projectStructure'],
    required: true
  },
  content: {
    type: mongoose.Schema.Schema.Types.Mixed,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  relevance: {
    type: Number,
    min: 0,
    max: 1,
    default: 1
  },
  metadata: {
    type: Map,
    of: String
  }
});

// Index pour la recherche rapide par projectId et type
contextualMemorySchema.index({ projectId: 1, type: 1 });

module.exports = mongoose.model('ContextualMemory', contextualMemorySchema);