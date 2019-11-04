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

  /*
  ------------------------ GAMES ---------------------------------------------------
  */
  MyMongoLib.getGames = () =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Get Games - Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection("Games");

        return collection
          .find({})
          .toArray()
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.getGame = game_id =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Get Game - Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection("Games");

        return collection
          .find({ _id: ObjectId(game_id) })
          .toArray()
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.postGame = newGame =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Post Game - Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection("Games");

        return collection
          .insertOne(newGame)
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.putGame = (game_id, updatedGame) =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Put Game - Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection("Games");

        return collection
          .updateOne({ _id: ObjectId(game_id) }, updatedGame)
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.deleteGame = game_id =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Delete Game - Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection("Games");

        return collection
          .deleteOne({ _id: ObjectId(game_id) })
          .then(resolve)
          .catch(reject);
      });
    });

  /*
  ------------------------ CHATS ---------------------------------------------------
  */
  MyMongoLib.getChats = () =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Get Chats - Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection("Chats");

        return collection
          .find({})
          .toArray()
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.getChat = chat_id =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Get Chat - Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection("Chats");

        return collection
          .find({ _id: ObjectId(chat_id) })
          .toArray()
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.postChat = newChat =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Post Chat - Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection("Chats");

        return collection
          .insertOne(newChat)
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.putChat = (chat_id, updatedChat) =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Put Chat - Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection("Chats");

        return collection
          .updateOne({ _id: ObjectId(chat_id) }, updatedChat)
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.deleteChat = chat_id =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Delete Chat - Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection("Chats");

        return collection
          .deleteOne({ _id: ObjectId(chat_id) })
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

      const questCollection = db.collection("Quests");
      const csCursorQuest = questCollection.watch();

      const gamesCollection = db.collection("Games");
      const csCursorGames = gamesCollection.watch();

      const chatsCollection = db.collection("Chats");
      const csCursorChats = chatsCollection.watch();

      console.log("Listening to changes on mongo");

      csCursorQuest.on("change", data => {
        console.log("Quests changed: ", data);
        MyMongoLib.getQuests().then(docs => cbk(JSON.stringify(docs)));
      });

      csCursorGames.on("change", data => {
        console.log("Games changed: ", data);
        MyMongoLib.getGames().then(docs => cbk(JSON.stringify(docs)));
      });

      csCursorChats.on("change", data => {
        console.log("Chats changed: ", data);
        MyMongoLib.getChats().then(docs => cbk(JSON.stringify(docs)));
      });
    });
  };

  return MyMongoLib;
};

module.exports = MyMongoLib;
