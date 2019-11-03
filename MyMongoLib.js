const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

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

  /*
  ------------------------ USERS ---------------------------------------------------
  */
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

  MyMongoLib.getUser = user_id =>
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
          .find({ _id: ObjectId(user_id) })
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

  MyMongoLib.putUser = (user_id, updatedUser) =>
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
          .updateOne({ _id: ObjectId(user_id) }, updatedUser)
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.deleteUser = user_id =>
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
          .deleteOne({ _id: ObjectId(user_id) })
          .then(resolve)
          .catch(reject);
      });
    });

  /*
  ------------------------ QUESTS ---------------------------------------------------
  */
  MyMongoLib.getQuests = () =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Get Quests - Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection("Quests");

        return collection
          .find({})
          .toArray()
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.getQuest = quest_id =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Get Quest - Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection("Quests");

        return collection
          .find({ _id: ObjectId(quest_id) })
          .toArray()
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.postQuest = newQuest =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Post Quest - Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection("Quests");

        return collection
          .insertOne(newQuest)
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.putQuest = (quest_id, updatedQuest) =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Put Quest - Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection("Quests");

        return collection
          .updateOne({ _id: ObjectId(quest_id) }, updatedQuest)
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.deleteQuest = quest_id =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Delete Quest - Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection("Quests");

        return collection
          .deleteOne({ _id: ObjectId(quest_id) })
          .then(resolve)
          .catch(reject);
      });
    });

  //----------------- Listening to Changes -------------------------------

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
