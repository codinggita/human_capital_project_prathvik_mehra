const dotenv = require('dotenv');
const path = require('path');

// Initialize environmental variables from .env
dotenv.config({ path: path.join(__dirname, '../.env') });

// ── STARTUP VALIDATION ──────────────────────────────────────────────────────
// Must run FIRST — before Express, DB, or any module that reads env vars.
// This prevents the server from starting with a missing JWT_SECRET and
// silently allowing token forgery or cryptic runtime errors on first request.
if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET environment variable is not set.');
  console.error('Set it in your .env file. See backend/.env.example for all required variables.');
  process.exit(1);
}
// ────────────────────────────────────────────────────────────────────────────

const connectDB = require('./config/db');
const app = require('./server');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {

    // Connect to Database
    await connectDB();

    // Start Listening
    app.listen(PORT, () => {
      console.log(`========================================`);
      console.log(`  Application: ${process.env.APP_NAME || 'MyBackend'}`);
      console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`  Port:        ${PORT}`);
      console.log(`  Status:      Online / Ready`);
      console.log(`========================================`);
    });
  } catch (err) {
    console.error(`Bootstrap Error: Server launch halted. Details: ${err.message}`);
    process.exit(1);
  }
};

startServer();
