import * as fs from 'node:fs/promises';
import { logger } from '../logger';

export async function copyAutounattend(unpackedWim) {
  try {
    await fs.copyFile('./tweaks/autounattend.xml', `${unpackedWim}Windows/System32/Sysprep/autounattend.xml`);
    logger.info('Autounattend.xml copied');
  } catch (err) {
    logger.error(`${err.name} ${err.message}`);
  }
}
