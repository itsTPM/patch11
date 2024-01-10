const { runPowerShellScript } = require('../utils');

async function delPathes(unpackedWim, config) {
  const promises = config.pathsToDelete.map((element) => {
    const fullPath = `${unpackedWim}${element.Path}`;
    const delPathScript = `takeown /f "${fullPath}" ${element.IsFolder ? '/r /d Y' : ''}
icacls "${fullPath}" /grant ("$env:username"+":F") /T /C | Out-Null
Remove-Item -Force "${fullPath}" ${element.IsFolder ? '-Recurse' : ''} -ErrorAction SilentlyContinue | Out-Null`;
    return runPowerShellScript(delPathScript);
  });

  await Promise.all(promises);
  console.log('Done!');
}

module.exports = delPathes;
