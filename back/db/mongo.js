const { MongoClient } = require('mongodb');

const connectionString = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_URL}/miniProj?authSource=admin`;
const mongo = new MongoClient(connectionString);

// get all data in mongo db
const getAll = async () => {
  await mongo.connect();
  const collection = mongo.db('miniProj').collection('data');
  let list = await collection.find().toArray();

  await mongo.close();
  return list;
};


// add new request data in mongo db
const putRequest = async (requestHash, data) => {
    await mongo.connect();
    const collection = mongo.db('miniProj').collection('data');
  
    const newData = {
      hash: requestHash,
      headers: data.headers,
      body: data.body
    };
    await collection.insertOne(newData);
    await mongo.close();
};


// get data associated with a single request
const getOne = async (requestHash) => {
  await mongo.connect();
  const collection = mongo.db('miniProj').collection('data');

  let request = await collection.findOne({ hash: requestHash }, { projection: { _id: 0 }} );
  await mongo.close();
  return request;
};



module.exports = {
  useMongo: {
    getAll,
    putRequest,
    getOne,
  }
}
