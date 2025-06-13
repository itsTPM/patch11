import * as fs from 'node:fs';
import { logger } from '../logger.js';

export function copyAutounattend(unpackedWim) {
  try {
    fs.copyFileSync('./tweaks/autounattend.xml', `${unpackedWim}Windows/System32/Sysprep/autounattend.xml`);
    logger.info('Autounattend.xml copied');
  } catch (err) {
    logger.error(`${err.name} ${err.message}`);
  }
}
