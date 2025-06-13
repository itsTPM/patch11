import { execSync } from 'node:child_process';
import { logger } from '../logger.js';

export function runPowerShellScript(script) {
  try {
    const stdout = execSync(script, { shell: 'powershell.exe', encoding: 'utf8' }).trim();
    return stdout; // Stdout sometimes contains line break characters, so it's better to return trimmed stdout
  } catch (error) {
    logger.error(`Error running PowerShell script: ${script}`, error.message);
  }
}
