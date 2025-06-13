import { runPowerShellScript } from '../utils/index.js';
import { logger } from './logger.js';

export async function unpackIso(unpackedIso, origIso) {
  const mountDriveScript = `(Mount-DiskImage -ImagePath "${origIso}" | Get-Volume).DriveLetter`;
  const copyFilesScript = `cp -Recurse "${driveLetter}:*" "${unpackedIso}" | Out-Null`;
  const unmountDriveScript = `Dismount-DiskImage -ImagePath "${origIso}" | Out-Null`;
  const driveLetter = await runPowerShellScript(mountDriveScript);

  if (!driveLetter) {
    throw new Error('Failed to mount ISO. No drive letter returned.');
  }

  logger.info(`Mounted ISO as ${driveLetter}:/`);

  await runPowerShellScript(copyFilesScript);
  logger.info('Copied files from ISO to unpacked ISO');

  await runPowerShellScript(unmountDriveScript);
  logger.info('Unmounted ISO');
}
