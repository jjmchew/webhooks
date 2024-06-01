const { createHash } = require('node:crypto');

const isBinHash = (binHash) => {
  const validPattern = binHash[4] === '-' && binHash[9] === '-';
  const validChars = binHash.replace(/[0-9a-z-]+/, '').length === 0;
  return binHash.length === 14 && validPattern && validChars
};

const isRequestHash = (requestHash) => {
  const validPattern = requestHash[5] === '-' && requestHash[11];
  const validChars = requestHash.replace(/[0-9a-z-]+/, '').length === 0;
  return requestHash.length === 17 && validPattern && validChars
};

const makeHash = (bin = true) => {
  // bin:     098d-f6b8-dedc     totalLen 14, subLen 4
  // request: 4c355-e31e4-e743e  totalLen 17, subLen 5

  let totalLen = bin ? 14 : 17;
  let subLen = bin ? 4 : 5;

  const hash = createHash('sha256');
  const randomStr = hash.update((Math.random() * 1000).toString())
                        .digest('hex');
  let str = '';
  for (let i = 1; i <= totalLen; i += 1) {
    str += i % (subLen + 1) === 0 ? '-' : randomStr[i];
  }
  return str;
};

// test code
// console.log(makeHash(false)); // e.g. 4c355-e31e4-e743e
// console.log(makeHash(true)); // e.g., 098d-f6b8-dedc
// console.log(isBinHash('098d-f6b8-dedc') === true); 
// console.log(isBinHash('k098d-f6b8-dedc') === false);
// console.log(isRequestHash('4c355-e31e4-e743e') === true);
// console.log(isRequestHash('4c355e31Ie4-e743e') === false);

module.exports = {
  makeHash,
  isBinHash,
  isRequestHash,
};