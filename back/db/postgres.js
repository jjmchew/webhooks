const { Client } = require('pg');

const CONNECTION = {
  connectionString: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PW}@${process.env.POSTGRES_URL}/miniProj`,
  ssl: false,
};

const pgQuery = async (statement, ...params) => {
  try {
    let client = new Client(CONNECTION);
  
    await client.connect();
    let result = await client.query(statement, params);
    await client.end();
  
    return result;
  } catch (e) {
    console.error('>>>>> pgQuery error: ', e);
  }
};


// get all requests
const getAll = async () => {
  const query = 'SELECT * from requests';
  const result = await pgQuery(query);

  if (result.rows.length === 0) return null;
  return result.rows;
};


// get all requests associated with a specific bin
const getRequests = async (binHash) => {
  const query = 'SELECT * from requests where binHash = $1';
  const result = await pgQuery(query, binHash);

  if (result.rows.length === 0) return null;
  return result.rows;
};


// check if requests exist for a given binHash
const isValidBin = async (binHash) => {
  const query = 'SELECT * from requests where binHash = $1';
  const result = await pgQuery(query, binHash);

  return result.rows.length !== 0
}


// write selected request data to postgres db
const putRequest = async (binHash, requestHash, data) => {
  const query = 'insert into requests (method, hostName, requestHash, binHash) values ($1, $2, $3, $4)';
  const result = await pgQuery(query, data.method, data.headers.origin, requestHash, binHash);
  return result.rowCount === 1;
};


module.exports = {
  usePg: {
    getAll,
    getRequests,
    isValidBin,
    putRequest,
  }
};



