import { runPowerShellScript } from '../utils/index.js';
import { logger } from '../logger.js';

export async function delPaths(unpackedWim, config) {
  const promises = config.pathsToDelete.map(async (element) => {
    const fullPath = `${unpackedWim}${element.Path}`;
    const delPathScript = `takeown /f "${fullPath}" ${element.IsFolder ? '/r /d Y' : ''}
icacls "${fullPath}" /grant ("$env:username"+":F") /T /C | Out-Null
Remove-Item -Force "${fullPath}" ${element.IsFolder ? '-Recurse' : ''} -ErrorAction SilentlyContinue | Out-Null`;

    return await runPowerShellScript(delPathScript);
  });

  try {
    await Promise.all(promises);
  } catch (error) {
    throw new Error(`Failed to delete paths: ${error.message}`);
  }

  logger.info('Deleted paths');
}
