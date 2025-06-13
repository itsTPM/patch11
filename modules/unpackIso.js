import { runPowerShellScript, printInfo, exitWithError } from '../utils/index.js';

export async function unpackIso(unpackedIso, origIso) {
  let driveLetter;
  try {
    const mountDriveScript = `(Mount-DiskImage -ImagePath "${origIso}" | Get-Volume).DriveLetter`;
    driveLetter = await runPowerShellScript(mountDriveScript);
    printInfo(`Mounted ISO as ${driveLetter}:/`);
    const copyFilesScript = `cp -Recurse "${driveLetter}:\*" "${unpackedIso}" | Out-Null`;
    await runPowerShellScript(copyFilesScript);
    printInfo('Copied files from ISO to unpacked ISO');
  } catch (error) {
    exitWithError(`Failed to unpack ISO. Error: ${error.message}`);
  } finally {
    if (driveLetter) {
      const unmountDriveScript = `Dismount-DiskImage -ImagePath "${origIso}" | Out-Null`;
      await runPowerShellScript(unmountDriveScript);
      printInfo('Unmounted ISO');
    }
  }
}
