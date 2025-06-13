import { runPowerShellScript } from '../utils/index.js';
import { logger } from './logger.js';

export async function patchRegistry(unpackedWim, currentWim) {
  const loadRegistryScript = `reg load HKLM\\${currentWim}_DEFAULT "${unpackedWim}Windows\\System32\\config\\default" | Out-Null
reg load HKLM\\${currentWim}_NTUSER "${unpackedWim}Users\\Default\\ntuser.dat" | Out-Null
reg load HKLM\\${currentWim}_SOFTWARE "${unpackedWim}Windows\\System32\\config\\SOFTWARE" | Out-Null
reg load HKLM\\${currentWim}_SYSTEM "${unpackedWim}Windows\\System32\\config\\SYSTEM" | Out-Null`;
  const unloadRegistryScript = `reg unload HKLM\\${currentWim}_DEFAULT | Out-Null
reg unload HKLM\\${currentWim}_NTUSER | Out-Null
reg unload HKLM\\${currentWim}_SOFTWARE | Out-Null
reg unload HKLM\\${currentWim}_SYSTEM | Out-Null`;
  const applyTweaks = `regedit /s "./tweaks/${currentWim}_patches.reg" | Out-Null`;

  await runPowerShellScript(loadRegistryScript);
  await runPowerShellScript(applyTweaks);
  await runPowerShellScript(unloadRegistryScript);

  logger.info(`Applied registry patches`);
}
