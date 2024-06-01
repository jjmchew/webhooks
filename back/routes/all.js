const path = require('path');
const allRouter = require('express').Router();

const { useMongo } = require('../db/mongo.js');
const { usePg } = require('../db/postgres.js');
const util = require('../lib/utils.js');

// test
allRouter.all('/*', (req, res, next) => {
  console.log('allRouter get /* :', req.subdomains);
  if (req.subdomains.length === 0) {
    const newPath = path.join('/root/miniProj/front/dist/index.html');
    console.log('allRouter - no subdomains, passing to index.html', newPath);
    res.sendFile(newPath, (err) => {
      if (err) res.status(500).send(err)
    });
  } else {
    console.log('allRouter - has subdomains should pass to next route with bin');
    next();
  }
});



// receives webhooks and stores them with appropriate binHash

allRouter.all('/', async (req, res, next) => {
  const binHash = req.subdomains[0];
  console.log('allRouter process webhooks', binHash);
  try {
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