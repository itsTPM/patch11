import * as fs from 'node:fs/promises';
import { logger } from './logger.js';

export async function createWorkDirectories(unpackDir, currentWim) {
  const directories = [
    unpackDir,
    `${unpackDir}\\iso\\`,
    `${unpackDir}\\${currentWim}\\`,
    `${unpackDir}\\bootimg\\`,
    `${unpackDir}\\tweaks\\`,
  ];

  try {
    await Promise.all(directories.map((dir) => fs.mkdir(dir, { recursive: true })));
  } catch (error) {
    throw new Error(`Failed to create directories: ${error.message}`);
  }

  logger.info('Created directories');
}
