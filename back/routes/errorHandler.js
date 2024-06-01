
const errorHandler = (err, _req, res, _next) => {
  console.error('>>>>> ErrorHandler: ', err.message);
  res.status(400).send({ error: err.message});
};

module.exports = errorHandler;
