import { runPowerShellScript } from '../utils/index.js';
import { logger } from '../logger.js';

export async function removeAppx(unpackedWim, config) {
  const getAppxListScript = `Get-AppxProvisionedPackage -Path "${unpackedWim}" | select PackageName`;
  const appxList = await runPowerShellScript(getAppxListScript);
  const removeList = appxList.split(/\s+/).filter((value) => config.appxToRemoveList.includes(value));

  const promises = removeList.map(async (element) => {
    logger.info(`Removing APPX ${element}...`);

    const removeAppxScript = `Remove-AppxProvisionedPackage -Path "${unpackedWim}" -PackageName "${element}" -ErrorAction SilentlyContinue | Out-Null`;

    return await runPowerShellScript(removeAppxScript);
  });

  await Promise.all(promises);
}
