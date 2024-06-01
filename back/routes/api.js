const apiRouter = require('express').Router();
const util = require('../lib/utils.js');
const { useMongo } = require('../db/mongo.js');
const { usePg } = require('../db/postgres.js');

// API routes

apiRouter.get('/', (_, res) => {
  res.send('server running');
});


// return new bin name
apiRouter.post('/new', (req, res) => {
  const binName = util.makeHash(true);
  res.setHeader('Access-Control-Allow-Origin', req.header('origin'));
  res.status(200).send({ binName: binName });
});


// get postgres data for specific bin
apiRouter.get('/:binHash/requests', async (req, res, next) => {
  try {
    const binHash = req.params.binHash;
    const requests = await usePg.getRequests(binHash);
    res.status(200).send(requests);
  } catch (e) {
    console.error('>>>>> apiRouter.get (usePg) error');
    next(e);
  }
});


// get mongo data for specific request
apiRouter.get('/:binHash/requests/:requestHash', async (req, res, next) => {
  try {
    const requestHash = req.params.requestHash;
    const request = await useMongo.getOne(requestHash);
    if (!request) throw new Error('Request not found');
    res.status(200).send(request);
  } catch (e) {
    console.error('>>>>> apiRouter.get (useMongo) error');
    next(e);
  }
});

module.exports = apiRouter;
