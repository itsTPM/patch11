import {
  setupWorkEnv,
  mountWim,
  createWorkDirectories,
  patchRegistry,
  unmountWim,
  generateWim,
  replaceWim,
} from './modules/index.js';

export async function patchBootwim(config) {
  const currentWim = 'bootwim';
  const currentWimFile = 'boot.wim';
  const imageIndex = 2;
  const { unpackDir, unpackedIso, unpackedWim } = setupWorkEnv(currentWim, config);

  await createWorkDirectories(unpackDir, currentWim);
  await mountWim(unpackedIso, unpackedWim, imageIndex, currentWimFile);
  await patchRegistry(unpackedWim, currentWim);
  await unmountWim(unpackedWim);
  await generateWim(unpackedIso, imageIndex, currentWimFile);
  await replaceWim(unpackedIso, currentWimFile);
}
