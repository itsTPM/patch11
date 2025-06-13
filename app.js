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
  delPathes,
  patchRegistry,
  copyAutounattend,
  unmountWim,
  generateWim,
  replaceWim,
  makeIso,
} from './modules/index.js';
import { patchBootwim } from './patchBootwim.js';
import { logger } from './logger.js';

async function main() {
  const currentWimFile = 'install.wim';
  const currentWim = 'installwim';
  const { origIso, unpackDir, unpackedIso, unpackedWim, patchedIso } = setupWorkEnv(currentWim, config);
  const config = await parseConfig();

  checkConfig(config);
  await createWorkDirectories(unpackDir, currentWim);
  await unpackIso(unpackedIso, origIso);
  const imageIndex = await getImageIndex(unpackedIso, config, currentWimFile);
  await mountWim(unpackedIso, unpackedWim, imageIndex, currentWimFile);
  await removeAppx(unpackedWim, config);
  await removeFeatures(unpackedWim, config);
  await delPathes(unpackedWim, config);
  await patchRegistry(unpackedWim, currentWim);
  await copyAutounattend(unpackedWim);
  await unmountWim(unpackedWim);
  await generateWim(unpackedIso, imageIndex, currentWimFile);
  await replaceWim(unpackedIso, currentWimFile);
  await patchBootwim(config);
  await makeIso(unpackedIso, patchedIso);

  logger.info(`Patching completed!`);
}
main();
