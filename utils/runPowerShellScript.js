const util = require('util');
const exec = util.promisify(require('child_process').exec); // Exec with promise
const printError = require('./printError');

async function runPowerShellScript(script) {
  try {
    const { stdout } = await exec(script, { shell: 'powershell.exe' });
    return stdout.trim() || ' '; // Stdout sometimes contains line break characters, so it's better to return trimmed stdout
  } catch (error) {
    printError(`Error running PowerShell script: ${script}`, error.message);
  }
}

module.exports = runPowerShellScript;
