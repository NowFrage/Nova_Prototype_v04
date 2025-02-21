const request = require('supertest');
const app = require('../../backend/server');

describe('Health Check Integration', () => {
  it('should return OK status from /api/health', async () => {
    const response = await request(app) // Utilise l'app Express directement, sans démarrer le serveur
      .get('/api/health')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ status: 'OK' });
  });
});
