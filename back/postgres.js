const { Client } = require('pg');


const CONNECTION = {
  connectionString: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PW}@${process.env.POSTGRES_URL}/miniProj`,
  ssl: false,
};


const pgQuery = async (statement, ...params) => {
  let client = new Client(CONNECTION);

  await client.connect();
  let result = await client.query(statement, params);
  await client.end();

  return result;

};


const getAll = async () => {
  const query = 'SELECT * from users';
  const result = await pgQuery(query);

  if (result.rows.length === 0) return null;
  return result.rows;
};


module.exports = {
  usePg: {
    getAll
  }
};



