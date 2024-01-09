const fs = require('fs').promises;
const { exitWithError, printInfo, printError } = require('../utils');

async function parseConfig() {
  const configPath = './config.json';
  try {
    await fs.access(configPath);
    const data = await fs.readFile(configPath, 'utf8');
    printInfo('Parsed config.json');
    return JSON.parse(data);
  } catch (error) {
    printError(error.name, error.message);
    exitWithError(
      `Failed to parse ${configPath}! Check JSON syntax and file existence. Error: ${error.name}, ${error.message}`
    );
  }
}

module.exports = parseConfig;
