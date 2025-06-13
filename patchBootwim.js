import {
  setupWorkEnv,
  mountWim,
  createWorkDirectories,
  patchRegistry,
  unmountWim,
  generateWim,
  replaceWim,
} from './modules/index.js';

export function patchBootwim(config) {
  const currentWim = 'bootwim';
  const currentWimFile = 'boot.wim';
  const imageIndex = 2;
  const { unpackDir, unpackedIso, unpackedWim } = setupWorkEnv(currentWim, config);

  createWorkDirectories(unpackDir, currentWim);
  mountWim(unpackedIso, unpackedWim, imageIndex, currentWimFile);
  patchRegistry(unpackedWim, currentWim);
  unmountWim(unpackedWim);
  generateWim(unpackedIso, imageIndex, currentWimFile);
  replaceWim(unpackedIso, currentWimFile);
}
