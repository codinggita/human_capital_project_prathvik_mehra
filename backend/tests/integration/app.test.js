const request = require('supertest');
const app = require('../../src/server');

describe('Express Server Integration Tests', () => {
  describe('GET /health', () => {
    it('should return 200 OK and health status details', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status', 'success');
      expect(res.body).toHaveProperty('message', 'Server is healthy and online');
      expect(res.body).toHaveProperty('timestamp');
      expect(res.body).toHaveProperty('uptime');
    });
  });

  describe('GET /api/v1', () => {
    it('should return 200 OK and index versioning welcome message', async () => {
      const res = await request(app).get('/api/v1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status', 'success');
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('Security Middlewares', () => {
    it('should apply security headers using Helmet', async () => {
      const res = await request(app).get('/health');
      expect(res.headers).toHaveProperty('x-dns-prefetch-control');
      expect(res.headers).toHaveProperty('x-frame-options');
    });

    it('should supply CORS headers', async () => {
      const res = await request(app)
        .get('/health')
        .set('Origin', 'http://localhost:3000');
      // Should allow standard access-control headers
      expect(res.headers).toHaveProperty('access-control-allow-origin');
    });
  });
});
