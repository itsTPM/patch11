const { exitWithError, printInfo } = require('./utils');
const {
  parseConfig,
  checkConfig,
  setupWorkEnv,
  unpackIso,
  mountWim,
  createDirectories,
  getImageIndex,
  removeAppx,
  removeFeatures,
  delPathes,
  patchRegistry,
  copyAutounattend,
  unmountWim,
  generateWim,
  replaceWim,
  makeIso,
} = require('./modules');

const bootwim = require('./bootwim');

async function main() {
  try {
    printInfo(`Welcome!`);
    // Initial setup
    const currentWimFile = 'install.wim';
    const config = await parseConfig();
    checkConfig(config);
    const currentWim = 'installwim';
    const { origIso, unpackDir, unpackedIso, unpackedWim, unpackedTweaks } = setupWorkEnv(currentWim, config);
    await createDirectories(unpackDir, currentWim);

    // Mount iso, copy files to "unpackDir" from config.json & unmount iso
    await unpackIso(unpackedIso, origIso);
    printInfo(`app.js says: Iso unpacked!`);

    // Get windows edition from config.json index in iso
    const imageIndex = await getImageIndex(unpackedIso, config, currentWimFile);
    printInfo(`app.js says: Index is ${imageIndex}`);

    // Mount install.wim
    await mountWim(unpackedIso, unpackedWim, imageIndex, currentWimFile);
    printInfo(`app.js says: Install.wim mounted!`);

    // Remove appx packages defined in config.json
    await removeAppx(unpackedWim, config);
    printInfo(`app.js says: All APPX packages is removed!`);

    // Remove features defined in config.json
    await removeFeatures(unpackedWim, config);
    printInfo(`app.js says: All features is removed!`);

    // Delete pathes defined in config.json
    await delPathes(unpackedWim, config);
    printInfo('app.js says: All pathes is deleted!');

    // Apply registry patches to install.wim
    await patchRegistry(unpackedWim, currentWim);
    printInfo('app.js says: Tweaks applied!');

    // Copy setup config file (autounattend.xml) to install.wim
    await copyAutounattend(unpackedWim);
    printInfo('app.js says: Autounattend copied!');

    // Unmount install.wim
    await unmountWim(unpackedWim);
    printInfo('app.js says: Install.wim unmounted!');

    // Export install.wim with patches
    await generateWim(unpackedIso, imageIndex, currentWimFile);

    // Replace old install.wim with patched install.wim
    await replaceWim(unpackedIso, currentWimFile);

    // Patch boot.wim also
    await bootwim(config);

    // Build iso with patched install.wim and boot.wim
    await makeIso(unpackedIso);
  } catch (error) {
    exitWithError(error.message);
  }
}

main();
