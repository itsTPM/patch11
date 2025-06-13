import {
  parseConfig,
  checkConfig,
  setupWorkEnv,
  unpackIso,
  mountWim,
  createWorkDirectories,
  getImageIndex,
  removeAppx,
  removeFeatures,
  delPaths,
  patchRegistry,
  copyAutounattend,
  unmountWim,
  generateWim,
  replaceWim,
  makeIso,
} from './modules/index.js';
import { patchBootwim } from './patchBootwim.js';
import { logger } from './logger.js';

function main() {
  const currentWimFile = 'install.wim';
  const currentWim = 'installwim';
  const config = parseConfig();
  const { origIso, unpackDir, unpackedIso, unpackedWim, patchedIso } = setupWorkEnv(currentWim, config);

  checkConfig(config);
  createWorkDirectories(unpackDir, currentWim);
  unpackIso(unpackedIso, origIso);
  const imageIndex = getImageIndex(unpackedIso, config, currentWimFile);
  mountWim(unpackedIso, unpackedWim, imageIndex, currentWimFile);
  removeAppx(unpackedWim, config);
  removeFeatures(unpackedWim, config);
  delPaths(unpackedWim, config);
  patchRegistry(unpackedWim, currentWim);
  copyAutounattend(unpackedWim);
  unmountWim(unpackedWim);
  generateWim(unpackedIso, imageIndex, currentWimFile);
  replaceWim(unpackedIso, currentWimFile);
  patchBootwim(config);
  makeIso(unpackedIso, patchedIso);

  logger.info(`Patching completed!`);
}
main();
