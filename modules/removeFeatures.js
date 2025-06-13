import { runPowerShellScript } from '../utils/index.js';
import { logger } from './logger.js';

export async function removeFeatures(unpackedWim, config) {
  const listAppxPS = `Get-WindowsPackage -Path "${unpackedWim}" | select PackageName`;
  let list = (await runPowerShellScript(listAppxPS)).split(/\s+/);
  list = list.filter((value) => config.appxToRemoveList.includes(value));
  const promises = list.map(async (element) => {
    logger.info(`Now: removing feature ${element}`);
    const removeFeaturesScript = `Remove-WindowsPackage -Path "${unpackedWim}" -PackageName "${element}" -ErrorAction SilentlyContinue | Out-Null`;
    return runPowerShellScript(removeFeaturesScript);
  });
  await Promise.all(promises);
}
