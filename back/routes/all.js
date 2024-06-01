const path = require('path');
const allRouter = require('express').Router();

const { useMongo } = require('../db/mongo.js');
const { usePg } = require('../db/postgres.js');
const util = require('../lib/utils.js');

// helper functions
const routeToReact = (res) => {
  const newPath = path.join('/root/miniProj/front/dist/index.html');
  console.log('routeToReact: ', newPath);
  res.sendFile(newPath, err => {
      if (err) res.status(500).send(err)
  });
};

const processBin = async (req) => {
  const binHash = req.subdomains[0];
  console.log('processBin: ', binHash, req.method);

  if (!util.isBinHash(binHash)) throw new Error('Invalid bin hash');

  const requestHash = util.makeHash(false);
  console.log('allRouter: ', req.method, 'bin: ', binHash, 'request', requestHash);

  await Promise.all([
    usePg.putRequest(binHash, requestHash, req),
    useMongo.putRequest(requestHash, req),
  ])
  .catch( _err => { throw new Error('Request could not be saved') });

  return { binHash: binHash, requestHash: requestHash };
};



// test

// receives webhooks and stores them with appropriate binHash
allRouter.all('/*', async (req, res, next) => {
  console.log('== allRouter all /* :', req.subdomains, req.method, req.path);
  if (req.subdomains.length === 0 || req.subdomains[0] === 'www') routeToReact(res);
  else {
    try {
      console.log('in try: ', req.method);
      console.log('========== ');
      const result = await processBin(req);
      res.status(200).send(result);
    } catch (e) {
      console.error('>>>>> allRouter error ', e.message);
      next(e);
    }
  }

});


module.exports = allRouter;