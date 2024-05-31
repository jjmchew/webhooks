const { MongoClient } = require('mongodb');

const connectionString = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_URL}/miniProj?authSource=admin`;
const mongo = new MongoClient(connectionString);


const getAll = async () => {
  await mongo.connect();
  const collection = mongo.db('miniProj').collection('data');
  let list = await collection.find().toArray();

  await mongo.close();
  return list;
};


module.exports = {
  useMongo: {
    getAll
  }
}
