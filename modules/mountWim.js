import { runPowerShellScript } from '../utils/index.js';
import { logger } from '../logger.js';

export function mountWim(unpackedIso, unpackedWim, imageIndex, currentWimFile) {
  const wimPath = `${unpackedIso}sources\\${currentWimFile}`;
  const mountWimScript = `Set-ItemProperty -Path "${wimPath}" -Name IsReadOnly -Value $false | Out-Null
  Mount-WindowsImage -ImagePath "${wimPath}" -Path "${unpackedWim}" -Index ${imageIndex} | Out-Null`;

  runPowerShellScript(mountWimScript);

  logger.info(`Mounted ${currentWimFile}`);
}
