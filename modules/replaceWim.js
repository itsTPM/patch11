import * as fs from 'fs/promises';

export async function replaceWim(unpackedIso, currentWimFile) {
  await fs.rm(`${unpackedIso}sources\\${currentWimFile}`);
  await fs.rename(`${unpackedIso}sources\\patched_${currentWimFile}`, `${unpackedIso}sources\\${currentWimFile}`);
}
