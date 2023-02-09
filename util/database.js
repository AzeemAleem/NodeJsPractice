const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://azeemaleem:Jn0ZB1F4OtgYhxPb@cluster0.0tnogk2.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      _db = client.db();
      callback();
    })
    .catch((err) => console.log(err));
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw "No Database Found";
  }
};

exports.getDb = getDb;
exports.mongoConnect = mongoConnect;
