const { runPowerShellScript, printInfo } = require('../utils');

async function removeFeatures(unpackedWim, config) {
  const listFeaturesPS = `Get-WindowsPackage -Path "${unpackedWim}" | select PackageName`;
  let list = (await runPowerShellScript(listFeaturesPS)).split(/\s+/);
  const checker = (value) => config.featuresToRemove.some((element) => value.includes(element));

  list = list.filter(checker);

  let chainedPromise = Promise.resolve();
  list.forEach((element) => {
    chainedPromise = chainedPromise.then(async () => {
      printInfo(`Now: removing feature ${element}`);
      const removeAppxPS = `Remove-WindowsPackage -Path "${unpackedWim}" -PackageName "${element}" -ErrorAction SilentlyContinue | Out-Null`;
      await runPowerShellScript(removeAppxPS);
    });
  });

  await chainedPromise;
}

module.exports = removeFeatures;
