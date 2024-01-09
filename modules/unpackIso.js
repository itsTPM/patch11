const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { runPowerShellScript, printInfo, exitWithError } = require('../utils');

async function unpackIso(unpackedIso, origIso) {
  try {
    const mountDriveScript = `(Mount-DiskImage -ImagePath "${origIso}" | Get-Volume).DriveLetter`;

    let driveLetter = await runPowerShellScript(mountDriveScript);

    printInfo(`Mounted ISO as ${driveLetter}:/`);

    const copyFilesScript = `cp -Recurse "${driveLetter}:\*" "${unpackedIso}" | Out-Null`;
    await exec(copyFilesScript, { shell: 'powershell.exe' });

    printInfo('Copied files from ISO to unpacked ISO');

    const unmountDriveScript = `Dismount-DiskImage -ImagePath "${origIso}" | Out-Null`;
    await exec(unmountDriveScript, { shell: 'powershell.exe' });

    printInfo('Unmounted ISO');
  } catch (error) {
    exitWithError(`Failed to unpack ISO. Error: ${error.message}`);
  }
}

module.exports = unpackIso;
