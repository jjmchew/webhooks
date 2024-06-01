const express = require('express');
const cors = require('cors');

const apiRouter = require('./routes/api.js');
const allRouter = require('./routes/all.js');
const errorHandler = require('./routes/errorHandler.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);
app.use('/', allRouter);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});

