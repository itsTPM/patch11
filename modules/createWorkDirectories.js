import * as fs from 'node:fs';
import { logger } from '../logger.js';

export function createWorkDirectories(unpackDir, currentWim) {
  const directories = [
    unpackDir,
    `${unpackDir}\\iso\\`,
    `${unpackDir}\\${currentWim}\\`,
    `${unpackDir}\\bootimg\\`,
    `${unpackDir}\\tweaks\\`,
  ];

  for (const dir of directories) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (error) {
      throw new Error(`Failed to create directory: ${error.message}`);
    }
  }

  logger.info('Created directories');
}
