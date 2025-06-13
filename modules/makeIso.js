import * as fs from 'node:fs/promises';
import { runPowerShellScript } from '../utils/index.js';
import { logger } from '../logger.js';

export async function makeIso(unpackedIso, patchedIso) {
  try {
    await fs.copyFile('./tweaks/autounattend.xml', `${unpackedIso}/autounattend.xml`);
  } catch (err) {
    logger.error(`${err.name} ${err.message}`);
  }

  const makeIsoScript = `./tweaks/oscdimg.exe -m -o -u2 -udfver102 -bootdata:("2#p0,e,b" + "${unpackedIso}" + "boot/etfsboot.com#pEF,e,b" + "${unpackedIso}efi/microsoft/boot/efisys.bin") ${unpackedIso} "${patchedIso}" | Out-Null`;

  return await runPowerShellScript(makeIsoScript);
}
