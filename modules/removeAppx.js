const { runPowerShellScript, printInfo } = require('../utils');

async function removeAppx(unpackedWim, config) {
  const listAppxPS = `Get-AppxProvisionedPackage -Path "${unpackedWim}" | select PackageName`;
  let list = (await runPowerShellScript(listAppxPS)).split(/\s+/);
  const checker = (value) => config.appxToRemoveList.some((element) => value.includes(element));

  list = list.filter(checker);

  let chainedPromise = Promise.resolve();
  list.forEach((element) => {
    chainedPromise = chainedPromise.then(async () => {
      printInfo(`Now: removing APPX ${element}`);
      const removeAppxPS = `Remove-AppxProvisionedPackage -Path "${unpackedWim}" -PackageName "${element}" -ErrorAction SilentlyContinue | Out-Null`;
      await runPowerShellScript(removeAppxPS);
    });
  });

  await chainedPromise;
}

module.exports = removeAppx;
