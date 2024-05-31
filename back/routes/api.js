const apiRouter = require('express').Router();

apiRouter.get('/', (_, res) => {
  res.send('server running');
});

module.exports = apiRouter;
