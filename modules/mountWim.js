import { runPowerShellScript } from '../utils/index.js';
import { logger } from './logger.js';

export async function mountWim(unpackedIso, unpackedWim, imageIndex, currentWimFile) {
  const mountWimPS = `Set-ItemProperty -Path "${unpackedIso}sources\\${currentWimFile}" -Name IsReadOnly -Value $false | Out-Null
  Mount-WindowsImage -ImagePath "${unpackedIso}sources\\${currentWimFile}" -Path "${unpackedWim}" -Index ${imageIndex} | Out-Null`;

  await runPowerShellScript(mountWimPS);

  logger.info(`Mounted ${currentWimFile}`);
}
