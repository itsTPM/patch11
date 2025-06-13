import { runPowerShellScript } from '../utils/index.js';
import { logger } from '../logger.js';

export function unpackIso(unpackedIso, origIso) {
  const mountDriveScript = `(Mount-DiskImage -ImagePath "${origIso}" | Get-Volume).DriveLetter`;
  const driveLetter = runPowerShellScript(mountDriveScript);
  const copyFilesScript = `cp -Recurse "${driveLetter}:*" "${unpackedIso}" | Out-Null`;
  const unmountDriveScript = `Dismount-DiskImage -ImagePath "${origIso}" | Out-Null`;

  if (!driveLetter) {
    throw new Error('Failed to mount ISO. No drive letter returned.');
  }

  logger.info(`Mounted ISO as ${driveLetter}:/`);

  runPowerShellScript(copyFilesScript);
  logger.info('Copied files from ISO to unpacked ISO');

  runPowerShellScript(unmountDriveScript);
  logger.info('Unmounted ISO');
}
