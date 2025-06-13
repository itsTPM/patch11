export function checkConfig(config) {
  if (!config) {
    throw new Error('Configuration is not defined');
  }

  checkWindowsEdition(config.windowsEdition);
}

function checkWindowsEdition(windowsEdition) {
  if (!windowsEdition) {
    throw new Error('Windows edition is not defined');
  }

  const validVersions = ['Windows 11'];
  const validEditions = ['Home', 'Pro', 'Education', 'Enterprise', 'SE', 'IoT'];
  const isValidEdition = validEditions.some((edition) => windowsEdition.includes(edition));
  const isValidVersion = validVersions.some((version) => windowsEdition.includes(version));

  if (!isValidEdition) {
    throw new Error(`Windows edition "${windowsEdition}" is not valid`);
  }

  if (!isValidVersion) {
    throw new Error(`Windows version "${windowsEdition}" is not supported`);
  }
}
