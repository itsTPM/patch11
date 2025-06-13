import { runPowerShellScript } from '../utils/index.js';
import { logger } from '../logger.js';

export async function removeAppx(unpackedWim, config) {
  const getAppxListScript = `Get-AppxProvisionedPackage -Path "${unpackedWim}" | select PackageName`;
  const appxList = await runPowerShellScript(getAppxListScript).split(/\s+/);
  const removeList = appxList.filter((appxListItem) =>
    config.appxToRemoveList.some((userListItem) => {
      const handledAppxListItem = appxListItem.toLowerCase().trim();
      const handledUserListItem = userListItem.toLowerCase().trim();

      return handledAppxListItem.startsWith(handledUserListItem);
    }),
  );

  for (const appxToRemove of removeList) {
    logger.info(`Removing APPX ${appxToRemove}...`);

    const removeAppxScript = `Remove-AppxProvisionedPackage -Path "${unpackedWim}" -PackageName "${appxToRemove}" | Out-Null`;

    await runPowerShellScript(removeAppxScript);
  }
}
