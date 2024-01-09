function setupWorkEnv(currentWim, config) {
  const { origIso, unpackDir } = config;
  const unpackedIso = `${unpackDir}\\iso\\`;
  const unpackedWim = `${unpackDir}\\${currentWim}\\`;
  const unpackedTweaks = `${unpackDir}\\tweaks\\`;
  return { origIso, unpackDir, unpackedIso, unpackedWim, unpackedTweaks };
}

module.exports = setupWorkEnv;
