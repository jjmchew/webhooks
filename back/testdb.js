const { usePg } = require('./db/postgres.js');
const { useMongo } = require('./db/mongo.js');

const testPg = async () => {
  console.log('testing Postgres db');
  let data = await usePg.getAll();
  console.log('postgres data: ', data);
};

const testMongo = async () => {
  console.log('testing Mongo db');
  let data = await useMongo.getAll();
  console.log('mongo data: ', data);
};

const main = async() => {
  await testPg();
  await testMongo();
}

main();

