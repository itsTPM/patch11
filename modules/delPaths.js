import { runPowerShellScript } from '../utils/index.js';
import { logger } from '../logger.js';

export function delPaths(unpackedWim, config) {
  for (const path of config.pathsToDelete) {
    const fullPath = `${unpackedWim}${path.Path}`;
    const delPathScript = `takeown /f "${fullPath}" ${path.IsFolder ? '/r /d Y' : ''}
icacls "${fullPath}" /grant ("$env:username"+":F") /T /C | Out-Null
Remove-Item -Force "${fullPath}" ${path.IsFolder ? '-Recurse' : ''} -ErrorAction SilentlyContinue | Out-Null`;

    runPowerShellScript(delPathScript);
  }

  logger.info('Deleted paths');
}
