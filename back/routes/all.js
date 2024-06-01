const path = require('path');
const allRouter = require('express').Router();

const { useMongo } = require('../db/mongo.js');
const { usePg } = require('../db/postgres.js');
const util = require('../lib/utils.js');

// test
allRouter.get('/*', (req, res, next) => {
  console.log('allRouter get /* :', req.subdomains);
  if (req.subdomains.length !== 0) {
    const newPath = path.join(__dirname, '../front/dist/index.html');
    console.log('allRouter - no subdomains, passing to index.html', newPath);
    res.sendFile(newPath, (err) => {
      if (err) res.status(500).send(err)
    });
  } else next();
});



// receives webhooks and stores them with appropriate binHash

allRouter.all('/:binHash', async (req, res, next) => {
  try {
    const binHash = req.params.binHash;
    if (!util.isBinHash(binHash)) throw new Error('Invalid bin hash');
  
    const requestHash = util.makeHash(false);
    console.log('allRouter: ', req.method, 'bin: ', binHash, 'request', requestHash);
  
    await Promise.all([
      usePg.putRequest(binHash, requestHash, req),
      useMongo.putRequest(requestHash, req),
    ])
    .catch( _err => { throw new Error('Request could not be saved') });
  
    res.status(200).send({ binHash: binHash, requestHash: requestHash });
  } catch (e) {
    console.error('>>>>> allRouter error', e.message);
    next(e);
  }
});

module.exports = allRouter;