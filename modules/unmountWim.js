import { runPowerShellScript } from '../utils/index.js';
import { logger } from './logger.js';

export async function unmountWim(unpackedWim) {
  const unmountWimScript = `Dismount-WindowsImage -Path "${unpackedWim}" -Save | Out-Null`;
  await runPowerShellScript(unmountWimScript).then(async () => {
    logger.info(`Unmounted ${unpackedWim} folder`);
    return;
  });
}
