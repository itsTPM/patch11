import { runPowerShellScript, exitWithError } from '../utils/index.js';
import { logger } from './logger.js';

export async function unpackIso(unpackedIso, origIso) {
  let driveLetter;
  try {
    const mountDriveScript = `(Mount-DiskImage -ImagePath "${origIso}" | Get-Volume).DriveLetter`;
    driveLetter = await runPowerShellScript(mountDriveScript);
    logger.info(`Mounted ISO as ${driveLetter}:/`);
    const copyFilesScript = `cp -Recurse "${driveLetter}:*" "${unpackedIso}" | Out-Null`;
    await runPowerShellScript(copyFilesScript);
    logger.info('Copied files from ISO to unpacked ISO');
  } catch (error) {
    exitWithError(`Failed to unpack ISO. Error: ${error.message}`);
  } finally {
    if (driveLetter) {
      const unmountDriveScript = `Dismount-DiskImage -ImagePath "${origIso}" | Out-Null`;
      await runPowerShellScript(unmountDriveScript);
      logger.info('Unmounted ISO');
    }
  }
}
