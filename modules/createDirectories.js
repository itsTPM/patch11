import * as fs from 'node:fs/promises';
import { exitWithError } from '../utils/index.js';
import { logger } from './logger.js';

export async function createDirectories(unpackDir, currentWim) {
  const directories = [
    unpackDir,
    `${unpackDir}\\iso\\`,
    `${unpackDir}\\${currentWim}\\`,
    `${unpackDir}\\bootimg\\`,
    `${unpackDir}\\tweaks\\`,
  ];
  try {
    await Promise.all(directories.map((dir) => fs.mkdir(dir, { recursive: true })));
    logger.info('Created directories');
  } catch (error) {
    exitWithError(error.message);
  }
}
