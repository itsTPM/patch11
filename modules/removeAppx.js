import { runPowerShellScript } from '../utils/index.js';
import { logger } from '../logger.js';

export async function removeAppx(unpackedWim, config) {
  const getAppxListScript = `Get-AppxProvisionedPackage -Path "${unpackedWim}" | select PackageName`;
  const appxList = await runPowerShellScript(getAppxListScript);
  const removeList = appxList.split(/\s+/).filter((appxListItem) =>
    config.appxToRemoveList.some((userListItem) => {
      const handledAppxListItem = appxListItem.toLowerCase().trim();
      const handledUserListItem = userListItem.toLowerCase().trim();

      return handledAppxListItem.startsWith(handledUserListItem);
    }),
  );

  for (const appToRemove of removeList) {
    logger.info(`Removing APPX ${appToRemove}...`);

    const removeAppxScript = `Remove-AppxProvisionedPackage -Path "${unpackedWim}" -PackageName "${appToRemove}" | Out-Null`;

    await runPowerShellScript(removeAppxScript);
  }
}
