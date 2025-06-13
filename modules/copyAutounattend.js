import * as fs from 'node:fs/promises';
import { printError } from '../utils/index.js';

export async function copyAutounattend(unpackedWim) {
  try {
    await fs.copyFile('./tweaks/autounattend.xml', `${unpackedWim}Windows/System32/Sysprep/autounattend.xml`);
  } catch (err) {
    printError(err.name, err.message);
  }
}
