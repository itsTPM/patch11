const { runPowerShellScript, printInfo } = require('../utils');

async function removeFeatures(unpackedWim, config) {
  const listAppxPS = `Get-WindowsPackage -Path "${unpackedWim}" | select PackageName`;
  let list = (await runPowerShellScript(listAppxPS)).split(/\s+/);

  list = list.filter((value) => config.appxToRemoveList.includes(value));

  const promises = list.map(async (element) => {
    printInfo(`Now: removing feature ${element}`);
    const removeFeaturesScript = `Remove-WindowsPackage -Path "${unpackedWim}" -PackageName "${element}" -ErrorAction SilentlyContinue | Out-Null`;
    return runPowerShellScript(removeFeaturesScript);
  });

  await Promise.all(promises);
}

module.exports = removeFeatures;
