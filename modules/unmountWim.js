const { runPowerShellScript, printInfo } = require('../utils');

async function unmountWim(unpackedWim) {
  const unmountWimScript = `Dismount-WindowsImage -Path "${unpackedWim}" -Save | Out-Null`;
  await runPowerShellScript(unmountWimScript).then(async () => {
    printInfo(`Unmounted ${unpackedWim} folder`);
    return;
  });
}

module.exports = unmountWim;
