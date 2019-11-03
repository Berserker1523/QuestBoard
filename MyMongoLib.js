const MongoClient = require("mongodb").MongoClient;

const MyMongoLib = function() {
  const MyMongoLib = this || {};

  // Connection URL
  const url =
    process.env.MONGO_URL ||
    "mongodb+srv://Berserker1523:aUzzl2eAz7NZRWUZ@cluster0-cjep6.mongodb.net/test?retryWrites=true&w=majority";
  // Database Name
  const dbName = "QuestBoard";
  // Create a new MongoClient
  const client = new MongoClient(url, { useUnifiedTopology: true });

  MyMongoLib.getDocs = () =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }
        console.log("Connected correctly to server");

        const db = client.db(dbName);
        const testCol = db.collection("Users");

        return testCol
          .find({})
          .limit(20)
          .toArray()
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.listenToChanges = cbk => {
    client.connect((err, client) => {
      if (err !== null) {
        throw err;
      }
      console.log("Connected correctly to server");

      const db = client.db(dbName);
      const testCol = db.collection("Users");

      const csCursor = testCol.watch();

      console.log("Listening to changes on mongo");
      csCursor.on("change", data => {
        console.log("changed", data);

        MyMongoLib.getDocs().then(docs => cbk(JSON.stringify(docs)));
      });
    });
  };

  return MyMongoLib;
};

module.exports = MyMongoLib;
