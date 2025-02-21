const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../app');
const Conversation = require('../../../models/chat/Conversation');
const Message = require('../../../models/chat/Message');

describe('Chat API Routes', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Conversation.deleteMany({});
    await Message.deleteMany({});
  });

  describe('GET /api/chat/conversations', () => {
    it('should return all conversations', async () => {
      // Créer des conversations de test
      await Conversation.create([
        { title: 'Test Conv 1', projectId: new mongoose.Types.ObjectId() },
        { title: 'Test Conv 2', projectId: new mongoose.Types.ObjectId() }
      ]);

      const response = await request(app)
        .get('/api/chat/conversations')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('title', 'Test Conv 1');
    });
  });

  describe('POST /api/chat/messages', () => {
    it('should create a new message', async () => {
      const conversation = await Conversation.create({
        title: 'Test Conv',
        projectId: new mongoose.Types.ObjectId()
      });

      const messageData = {
        content: 'Test message',
        role: 'user',
        modelId: 'gpt-3.5-turbo',
        conversationId: conversation._id
      };

      const response = await request(app)
        .post('/api/chat/messages')
        .send(messageData)
        .expect(201);

      expect(response.body).toHaveProperty('content', 'Test message');
      expect(response.body).toHaveProperty('role', 'user');
    });
  });
});