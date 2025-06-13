import { exitWithError } from '../utils/index.js';

// Check that "windowsEdition" in config.json contains "Windows 11" and edition (examples: "Windows 11 Home", "Windows 11 Enterprise IoT")
export function checkConfig(config) {
  const validEditions = ['Home', 'Pro', 'Education', 'Enterprise', 'SE', 'IoT'];
  if (!config || !config.windowsEdition) {
    exitWithError('Config or windowsEdition is not defined');
  } else if (
    !config.windowsEdition.includes('Windows 11') ||
    !validEditions.some((edition) => config.windowsEdition.includes(edition))
  ) {
    exitWithError(`Windows edition "${config.windowsEdition}" is incorrect`);
  }
}
