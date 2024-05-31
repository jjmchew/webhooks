
const errorHandler = (err, _req, res, _next) => {
  console.log(err);
  res.status(400).send({ error: err.text }).end();
};

module.exports = errorHandler;
