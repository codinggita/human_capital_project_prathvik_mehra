// Basic scalable console logger wrapper.
// In a real production app, this abstracts away implementation so you can easily swap to Winston or Pino later.
const logger = {
  info: (message, meta = {}) => {
    console.log(
      `[INFO] ${new Date().toISOString()} - ${message}`,
      Object.keys(meta).length ? meta : "",
    );
  },
  warn: (message, meta = {}) => {
    console.warn(
      `[WARN] ${new Date().toISOString()} - ${message}`,
      Object.keys(meta).length ? meta : "",
    );
  },
  error: (message, error = null) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    if (error) console.error(error.stack || error);
  },
};

module.exports = logger;
