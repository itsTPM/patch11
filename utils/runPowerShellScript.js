import util from 'node:util';
import { exec as exec$0 } from 'node:child_process';
import { printError } from './printError.js';

const exec = util.promisify({ exec: exec$0 }.exec); // Exec with promise

export async function runPowerShellScript(script) {
  try {
    const { stdout } = await exec(script, { shell: 'powershell.exe' });
    return stdout.trim() || ' '; // Stdout sometimes contains line break characters, so it's better to return trimmed stdout
  } catch (error) {
    printError(`Error running PowerShell script: ${script}`, error.message);
  }
}
