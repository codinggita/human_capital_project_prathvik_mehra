const corsOptions = require('../../src/config/corsOptions');
const rateLimiter = require('../../src/config/rateLimiter');

describe('Configuration Modules Unit Tests', () => {
  describe('CORS Options Configuration', () => {
    it('should configure credentials to be true', () => {
      expect(corsOptions.credentials).toBe(true);
    });

    it('should allow standard methods', () => {
      expect(corsOptions.methods).toContain('GET');
      expect(corsOptions.methods).toContain('POST');
      expect(corsOptions.methods).toContain('OPTIONS');
    });
  });

  describe('Rate Limiter Configuration', () => {
    it('should export rate limiter middleware instance', () => {
      expect(rateLimiter).toBeDefined();
      expect(typeof rateLimiter).toBe('function');
    });
  });
});
