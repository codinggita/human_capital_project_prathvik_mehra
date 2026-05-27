const corsOptions = {
  origin: process.env.CORS_ORIGIN === '*' ? '*' : (process.env.CORS_ORIGIN || '').split(','),
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

module.exports = corsOptions;
