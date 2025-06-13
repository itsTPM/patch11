import { runPowerShellScript } from '../utils/index.js';

export function getImageIndex(unpackedIso, config, currentWimFile) {
  const getImageIndexPS = `Get-WindowsImage -ImagePath "${unpackedIso}sources\\${currentWimFile}" | where-object { $_.ImageName -eq "${config.windowsEdition}" } | Select-Object -ExpandProperty ImageIndex`;

  return runPowerShellScript(getImageIndexPS);
}
