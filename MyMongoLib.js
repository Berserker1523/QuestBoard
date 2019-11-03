const MongoClient = require("mongodb").MongoClient;

const MyMongoLib = function() {
  const MyMongoLib = this || {};

  // Connection URL
  const url = process.env.MONGO_URL || null;
  if (url === null) {
    throw "MONGO_URL env variable is not set";
  }

  // Database Name
  const dbName = "QuestBoard";
  // Create a new MongoClient
  const client = new MongoClient(url, { useUnifiedTopology: true });

  MyMongoLib.getUsers = () =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Get Users - Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection("Users");

        return collection
          .find({})
          .toArray()
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.getUser = user_mail =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Get User - Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection("Users");

        return collection
          .find({ mail: user_mail })
          .toArray()
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.postUser = newUser =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Post User - Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection("Users");

        return collection
          .insertOne(newUser)
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.putUser = (user_mail, updatedUser) =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Put User - Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection("Users");

        return collection
          .updateOne({ mail: user_mail }, updatedUser)
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.deleteUser = user_mail =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Delete User - Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection("Users");

        return collection
          .deleteOne({ mail: user_mail })
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.listenToChanges = cbk => {
    client.connect((err, client) => {
      if (err !== null) {
        throw err;
      }
      console.log("ListenToChanges - Connected correctly to server");

      const db = client.db(dbName);
      const testCol = db.collection("Users");

      const csCursor = testCol.watch();

      console.log("Listening to changes on mongo");
      csCursor.on("change", data => {
        console.log("changed", data);

        MyMongoLib.getUsers().then(docs => cbk(JSON.stringify(docs)));
      });
    });
  };

  return MyMongoLib;
};

module.exports = MyMongoLib;
