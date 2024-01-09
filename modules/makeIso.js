const { runPowerShellScript } = require('../utils');
const fs = require('fs').promises;

async function makeIso(unpackedIso, patchedIso) {
  await fs.copyFile('./tweaks/autounattend.xml', `${unpackedIso}/autounattend.xml`).then((err) => {
    if (err) printError(err.name, err.message);
  });
  const makeIsoScript = `./tweaks/oscdimg.exe -m -o -u2 -udfver102 -bootdata:("2#p0,e,b" + "${unpackedIso}" + "boot/etfsboot.com#pEF,e,b" + "${unpackedIso}efi/microsoft/boot/efisys.bin") ${unpackedIso} "${patchedIso}" | Out-Null`;
  await runPowerShellScript(makeIsoScript);
}

module.exports = makeIso;
