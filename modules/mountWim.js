import { runPowerShellScript, printInfo } from '../utils/index.js';

export async function mountWim(unpackedIso, unpackedWim, imageIndex, currentWimFile) {
  const mountWimPS = `Set-ItemProperty -Path "${unpackedIso}sources\\${currentWimFile}" -Name IsReadOnly -Value $false | Out-Null
  Mount-WindowsImage -ImagePath "${unpackedIso}sources\\${currentWimFile}" -Path "${unpackedWim}" -Index ${imageIndex} | Out-Null`;
  await runPowerShellScript(mountWimPS).then(async () => {
    printInfo(`Mounted ${currentWimFile}`);
    return;
  });
}
