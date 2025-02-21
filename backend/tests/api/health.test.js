const request = require('supertest');
const express = require('express');
const baseRoute = require('../../src/api/baseRoute');

describe('Health Check API', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use('/api', baseRoute);
  });

  it('should return 200 and OK status', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      status: 'OK'
    });
  });

  it('should handle invalid path', async () => {
    await request(app).get('/api/invalid').expect(404);
  });
});
