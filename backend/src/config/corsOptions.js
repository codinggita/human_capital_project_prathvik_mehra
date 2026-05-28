const corsOptions = {
  // credentials: true CANNOT be used with origin: '*' (browser security restriction)
  // We resolve the origin dynamically: if CORS_ORIGIN is '*', disable credentials.
  // If specific origins are set (comma-separated), credentials are allowed.
  origin: (origin, callback) => {
    const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000').split(',').map(o => o.trim());

    // Allow requests with no origin (e.g., Postman, server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: Origin ${origin} is not allowed`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true   // Safe now because we never return '*' when this is true
};

module.exports = corsOptions;
