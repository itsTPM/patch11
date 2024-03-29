const fs = require('fs');

async function replaceWim(unpackedIso, currentWimFile) {
  await fs.rmSync(`${unpackedIso}sources\\${currentWimFile}`);
  await fs.renameSync(`${unpackedIso}sources\\patched_${currentWimFile}`, `${unpackedIso}sources\\${currentWimFile}`);
}

module.exports = replaceWim;
