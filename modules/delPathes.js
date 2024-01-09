const { runPowerShellScript } = require('../utils');

async function delPathes(unpackedWim, config) {
  for (const element of config.pathsToDelete) {
    if (element.IsFolder) {
      const delPathScript = `takeown /f "${unpackedWim}${element.Path}" /r /d Y | Out-Null
      icacls "${unpackedWim}${element.Path}" /grant ("$env:username"+":F") /T /C | Out-Null
      Remove-Item -Force "${unpackedWim}${element.Path}" -Recurse -ErrorAction SilentlyContinue | Out-Null`;
      await runPowerShellScript(delPathScript);
    } else {
      const delPathScript = `takeown /f "${unpackedWim}${element.Path}" | Out-Null
      icacls "${unpackedWim}${element.Path}" /grant ("$env:username"+":F") /T /C | Out-Null
      Remove-Item -Force "${unpackedWim}${element.Path}" -ErrorAction SilentlyContinue | Out-Null`;
      await runPowerShellScript(delPathScript);
    }
  }
  console.log('Done!');
}

module.exports = delPathes;
