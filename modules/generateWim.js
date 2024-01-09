const { runPowerShellScript } = require('../utils');

async function generateWim(unpackedIso, imageIndex, currentWimFile) {
  const generateWimScript = `Export-WindowsImage -SourceImagePath "${unpackedIso}sources\\${currentWimFile}" -SourceIndex ${imageIndex} -DestinationImagePath "${unpackedIso}sources\\patched_${currentWimFile}" -CompressionType max | Out-Null`;
  await runPowerShellScript(generateWimScript);
}

module.exports = generateWim;
