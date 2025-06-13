import * as fs from 'node:fs';
import { runPowerShellScript } from '../utils/index.js';
import { logger } from '../logger.js';

export function makeIso(unpackedIso, patchedIso) {
  try {
    fs.copyFileSync('./tweaks/autounattend.xml', `${unpackedIso}/autounattend.xml`);
  } catch (err) {
    logger.error(`${err.name} ${err.message}`);
  }

  const makeIsoScript = `./tweaks/oscdimg.exe -m -o -u2 -udfver102 -bootdata:("2#p0,e,b" + "${unpackedIso}" + "boot/etfsboot.com#pEF,e,b" + "${unpackedIso}efi/microsoft/boot/efisys.bin") ${unpackedIso} "${patchedIso}" | Out-Null`;

  return runPowerShellScript(makeIsoScript);
}
