import { runPowerShellScript } from '../utils/index.js';
import { logger } from '../logger.js';

export async function removeFeatures(unpackedWim, config) {
  const getFeatureListScript = `Get-WindowsPackage -Path "${unpackedWim}" | select PackageName`;
  const featureList = await runPowerShellScript(getFeatureListScript);
  const removeList = featureList.split(/\s+/).filter((value) => config.featuresToRemoveList.includes(value));

  const promises = removeList.map(async (element) => {
    logger.info(`Removing feature ${element}...`);

    const removeFeaturesScript = `Remove-WindowsPackage -Path "${unpackedWim}" -PackageName "${element}" -ErrorAction SilentlyContinue | Out-Null`;

    return await runPowerShellScript(removeFeaturesScript);
  });

  await Promise.all(promises);
}
