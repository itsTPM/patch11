import * as fs from 'node:fs';

export function replaceWim(unpackedIso, currentWimFile) {
  fs.rmSync(`${unpackedIso}sources\\${currentWimFile}`);
  fs.renameSync(`${unpackedIso}sources\\patched_${currentWimFile}`, `${unpackedIso}sources\\${currentWimFile}`);
}
