const dotenv = require('dotenv');
const path = require('path');

// Initialize environmental variables from .env
dotenv.config({ path: path.join(__dirname, '../.env') });

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
