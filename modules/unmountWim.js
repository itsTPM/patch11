import { runPowerShellScript } from '../utils/index.js';
import { logger } from '../logger.js';

export function unmountWim(unpackedWim) {
  const unmountWimScript = `Dismount-WindowsImage -Path "${unpackedWim}" -Save | Out-Null`;

  runPowerShellScript(unmountWimScript);
  logger.info(`Unmounted ${unpackedWim} folder`);
}
