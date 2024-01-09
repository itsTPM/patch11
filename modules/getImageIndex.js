const { runPowerShellScript } = require('../utils');

async function getImageIndex(unpackedIso, config, currentWimFile) {
  const getImageIndexPS = `Get-WindowsImage -ImagePath "${unpackedIso}sources\\${currentWimFile}" | where-object { $_.ImageName -eq "${config.windowsEdition}" } | Select-Object -ExpandProperty ImageIndex`;
  return await runPowerShellScript(getImageIndexPS);
}

module.exports = getImageIndex;
