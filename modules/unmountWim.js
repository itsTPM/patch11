import { runPowerShellScript, printInfo } from '../utils/index.js';

export async function unmountWim(unpackedWim) {
  const unmountWimScript = `Dismount-WindowsImage -Path "${unpackedWim}" -Save | Out-Null`;
  await runPowerShellScript(unmountWimScript).then(async () => {
    printInfo(`Unmounted ${unpackedWim} folder`);
    return;
  });
}
