const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../app');
const Project = require('../../../models/project/Project');

describe('Projects API Routes', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Project.deleteMany({});
  });

  describe('GET /api/projects', () => {
    it('should return all projects', async () => {
      await Project.create([
        { name: 'Project 1', path: '/path/1' },
        { name: 'Project 2', path: '/path/2' }
      ]);

      const response = await request(app)
        .get('/api/projects')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('name', 'Project 1');
    });
  });

  describe('POST /api/projects', () => {
    it('should create a new project', async () => {
      const projectData = {
        name: 'New Project',
        description: 'Test description',
        path: '/test/path',
        settings: {
          defaultModel: 'gpt-3.5-turbo',
          theme: 'dark'
        }
      };

      const response = await request(app)
        .post('/api/projects')
        .send(projectData)
        .expect(201);

      expect(response.body).toHaveProperty('name', 'New Project');
      expect(response.body.settings).toHaveProperty('theme', 'dark');
    });
  });
});