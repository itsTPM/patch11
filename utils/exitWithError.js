function exitWithError(msg) {
  console.error(`[ERROR]: \x1b[31m${msg}\x1b[0m`);
  process.exit();
}

module.exports = exitWithError;
