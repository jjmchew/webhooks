
const allRouter = require('express').Router();

allRouter.all('/:binName', (req, res) => {
  const binName = req.params.binName;
  console.log('allRouter: ', req.method, binName);
  res.status(200).send({ binName: binName });
});

module.exports = allRouter;