import * as fs from 'node:fs/promises';
import { exitWithError, printInfo } from '../utils/index.js';

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
    printInfo('Created directories');
  } catch (error) {
    exitWithError(error.message);
  }
}
