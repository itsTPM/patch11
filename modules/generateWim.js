import { runPowerShellScript } from '../utils/index.js';

export async function generateWim(unpackedIso, imageIndex, currentWimFile) {
  const generateWimScript = `Export-WindowsImage -SourceImagePath "${unpackedIso}sources\\${currentWimFile}" -SourceIndex ${imageIndex} -DestinationImagePath "${unpackedIso}sources\\patched_${currentWimFile}" -CompressionType max | Out-Null`;

  return await runPowerShellScript(generateWimScript);
}
