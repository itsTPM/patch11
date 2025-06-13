import { runPowerShellScript } from '../utils/index.js';
import { logger } from '../logger.js';

export async function removeFeatures(unpackedWim, config) {
  const getFeatureListScript = `Get-WindowsPackage -Path "${unpackedWim}" | select PackageName`;
  const featureList = await runPowerShellScript(getFeatureListScript).split(/\s+/);
  const removeList = featureList.filter((featureListItem) =>
    config.featureToRemoveList.some((userListItem) => {
      const handledFeatureListItem = featureListItem.toLowerCase().trim();
      const handledUserListItem = userListItem.toLowerCase().trim();

      return handledFeatureListItem.startsWith(handledUserListItem);
    }),
  );

  for (const featureToRemove of removeList) {
    logger.info(`Removing feature ${featureToRemove}...`);

    const removeFeaturesScript = `Remove-WindowsPackage -Path "${unpackedWim}" -PackageName "${featureToRemove}" -ErrorAction SilentlyContinue | Out-Null`;

    await runPowerShellScript(removeFeaturesScript);
  }
}
