const { exitWithError, printInfo } = require('./utils');
const {
  setupWorkEnv,
  mountWim,
  createDirectories,
  patchRegistry,
  unmountWim,
  generateWim,
  replaceWim,
} = require('./modules');

async function bootwim(config) {
  try {
    // Initial setup
    const currentWim = 'bootwim';
    const currentWimFile = 'boot.wim';
    const { unpackDir, unpackedIso, unpackedWim, unpackedTweaks } = setupWorkEnv(currentWim, config);
    await createDirectories(unpackDir, currentWim);

    const imageIndex = 2;

    // Mount boot.wim
    await mountWim(unpackedIso, unpackedWim, imageIndex, currentWimFile);

    // Apply registry patches to boot.wim
    await patchRegistry(unpackedWim, currentWim);
    printInfo('Tweaks applied!');

    // Unmount boot.wim
    await unmountWim(unpackedWim);

    // Export boot.wim with patches
    await generateWim(unpackedIso, imageIndex, currentWimFile);

    // Replace old boot.wim with patched boot.wim
    await replaceWim(unpackedIso, currentWimFile);
  } catch (error) {
    exitWithError(error.message);
  }
}

module.exports = bootwim;
