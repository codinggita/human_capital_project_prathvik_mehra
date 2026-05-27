const mongoose = require('mongoose');
const connectDB = require('../../src/config/db');

jest.mock('mongoose', () => {
  const original = jest.requireActual('mongoose');
  return {
    ...original,
    connect: jest.fn()
  };
});

describe('Database Connection Module Unit Tests', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should successfully establish mongoose connection', async () => {
    mongoose.connect.mockResolvedValueOnce({
      connection: { host: '127.0.0.1' }
    });

    const conn = await connectDB();
    expect(mongoose.connect).toHaveBeenCalled();
    expect(conn.connection.host).toBe('127.0.0.1');
  });

  it('should throw connection error and propagate if database connection fails', async () => {
    mongoose.connect.mockRejectedValueOnce(new Error('Connection Timeout'));

    await expect(connectDB()).rejects.toThrow('Connection Timeout');
  });
});
