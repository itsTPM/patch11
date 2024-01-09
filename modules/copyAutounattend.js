const fs = require('fs').promises;
const { printError } = require('../utils');

async function copyAutounattend(unpackedWim) {
  await fs
    .copyFile('./tweaks/autounattend.xml', `${unpackedWim}Windows/System32/Sysprep/autounattend.xml`)
    .then((err) => {
      if (err) printError(err.name, err.message);
    });
}

module.exports = copyAutounattend;
