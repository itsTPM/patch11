import { runPowerShellScript, printInfo } from '../utils/index.js';

export async function removeAppx(unpackedWim, config) {
  const listAppxPS = `Get-AppxProvisionedPackage -Path "${unpackedWim}" | select PackageName`;
  let list = (await runPowerShellScript(listAppxPS)).split(/\s+/);
  list = list.filter((value) => config.appxToRemoveList.includes(value));
  const promises = list.map(async (element) => {
    printInfo(`Now: removing APPX ${element}`);
    const removeAppxPS = `Remove-AppxProvisionedPackage -Path "${unpackedWim}" -PackageName "${element}" -ErrorAction SilentlyContinue | Out-Null`;
    return runPowerShellScript(removeAppxPS);
  });
  await Promise.all(promises);
}
