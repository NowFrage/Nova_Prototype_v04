const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../app');
const ContextualMemory = require('../../../models/memory/ContextualMemory');

describe('Memory API Routes', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await ContextualMemory.deleteMany({});
  });

  describe('POST /api/memory', () => {
    it('should create a new memory entry', async () => {
      const memoryData = {
        projectId: new mongoose.Types.ObjectId(),
        type: 'conversation',
        content: { text: 'Test memory' },
        metadata: { source: 'test' }
      };

      const response = await request(app)
        .post('/api/memory')
        .send(memoryData)
        .expect(201);

      expect(response.body).toHaveProperty('type', 'conversation');
      expect(response.body.content).toHaveProperty('text', 'Test memory');
    });
  });

  describe('GET /api/memory/project/:projectId', () => {
    it('should return project memories', async () => {
      const projectId = new mongoose.Types.ObjectId();
      await ContextualMemory.create([
        {
          projectId,
          type: 'conversation',
          content: { text: 'Memory 1' }
        },
        {
          projectId,
          type: 'codeContext',
          content: { text: 'Memory 2' }
        }
      ]);

      const response = await request(app)
        .get(`/api/memory/project/${projectId}`)
        .expect(200);

      expect(response.body).toHaveLength(2);
    });
  });
});