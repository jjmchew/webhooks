const allRouter = require('express').Router();

const { useMongo } = require('../db/mongo.js');
const { usePg } = require('../db/postgres.js');
const util = require('../lib/utils.js');

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