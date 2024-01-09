function setupWorkEnv(currentWim, config) {
  const { origIso, unpackDir, patchedIso } = config;
  const unpackedIso = `${unpackDir}\\iso\\`;
  const unpackedWim = `${unpackDir}\\${currentWim}\\`;
  const unpackedTweaks = `${unpackDir}\\tweaks\\`;
  return { origIso, unpackDir, unpackedIso, unpackedWim, unpackedTweaks, patchedIso };
}

module.exports = setupWorkEnv;
