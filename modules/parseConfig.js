import * as fs from 'node:fs/promises';
import { exitWithError } from '../utils/index.js';
import { logger } from '../logger.js';

export async function parseConfig() {
  const configPath = './config.json';
  try {
    await fs.access(configPath);
    const data = await fs.readFile(configPath, 'utf8');
    logger.info('Parsed config.json');
    return JSON.parse(data);
  } catch (error) {
    logger.error(error.name, error.message);
    exitWithError(
      `Failed to parse ${configPath}! Check JSON syntax and file existence. Error: ${error.name}, ${error.message}`,
    );
  }
}
