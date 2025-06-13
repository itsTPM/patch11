export const logger = {
  info: (message) => {
    console.log(`\x1b[32m[INFO]\x1b[0m ${message}`);
  },
  warn: (message) => {
    console.log(`\x1b[33m[WARN]\x1b[0m ${message}`);
  },
  error: (message) => {
    console.error(`\x1b[31m[ERROR]\x1b[0m ${message}`);
  },
  debug: (message) => {
    if (process.env.DEBUG) {
      console.log(`\x1b[34m[DEBUG]\x1b[0m ${message}`);
    }
  },
};
