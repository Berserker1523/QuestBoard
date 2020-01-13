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

  client.connect((err /*,client*/) => {
    if (err !== null) {
      console.error(err);
      return;
    }
  });

  /*
  ------------------------ USERS ---------------------------------------------------
  */
  MyMongoLib.getUsers = () =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server

      console.log("Get Users - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Users");

      return collection
        .find({})
        .toArray()
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  MyMongoLib.getUser = user_mail =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server

      console.log("Get User - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Users");

      return collection
        .find({ mail: user_mail })
        .toArray()
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  MyMongoLib.postUser = newUser =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server

      console.log("Post User - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Users");

      return collection
        .insertOne(newUser)
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  MyMongoLib.putUser = (user_id, updatedUser) =>
    new Promise((resolve, reject) => {
      console.log("Put User - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Users");

      return collection
        .updateOne({ _id: ObjectId(user_id) }, updatedUser)
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  MyMongoLib.deleteUser = user_id =>
    new Promise((resolve, reject) => {
      console.log("Delete User - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Users");

      return collection
        .deleteOne({ _id: ObjectId(user_id) })
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  /*
  ------------------------ QUESTS ---------------------------------------------------
  */
  MyMongoLib.getQuests = () =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server

      console.log("Get Quests - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Quests");

      return collection
        .find({})
        .toArray()
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  MyMongoLib.getQuestsByUserMail = user_mail =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server

      console.log("Get Quests by user mail - Connected correctly to server");

      const db = client.db(dbName);
      const questsCollection = db.collection("Quests");

      MyMongoLib.getUser(user_mail)
        .then(docs => {
          questsCollection
            .find({ owner: docs[0]._id + "" })
            .toArray()
            .then(data => {
              resolve(data);
            })
            .catch(reject);
        })
        .catch(reject);
    });

  MyMongoLib.getQuest = quest_id =>
    new Promise((resolve, reject) => {
      console.log("Get Quest - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Quests");

      return collection
        .find({ _id: ObjectId(quest_id) })
        .toArray()
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  MyMongoLib.postQuest = newQuest =>
    new Promise((resolve, reject) => {
      console.log("Post Quest - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Quests");

      return collection
        .insertOne(newQuest)
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  MyMongoLib.putQuest = (quest_id, updatedQuest) =>
    new Promise((resolve, reject) => {
      console.log("Put Quest - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Quests");

      return collection
        .updateOne({ _id: ObjectId(quest_id) }, updatedQuest)
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  MyMongoLib.deleteQuest = quest_id =>
    new Promise((resolve, reject) => {
      console.log("Delete Quest - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Quests");

      return collection
        .deleteOne({ _id: ObjectId(quest_id) })
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  /*
  ------------------------ GAMES ---------------------------------------------------
  */
  MyMongoLib.getGames = () =>
    new Promise((resolve, reject) => {
      console.log("Get Games - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Games");

      return collection
        .find({})
        .toArray()
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  MyMongoLib.getGame = game_id =>
    new Promise((resolve, reject) => {
      console.log("Get Game - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Games");

      return collection
        .find({ _id: ObjectId(game_id) })
        .toArray()
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  MyMongoLib.getGameByName = game_name =>
    new Promise((resolve, reject) => {
      console.log("Get Game by Name - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Games");

      return collection
        .find({ name: game_name })
        .toArray()
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  MyMongoLib.postGame = newGame =>
    new Promise((resolve, reject) => {
      console.log("Post Game - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Games");

      return collection
        .insertOne(newGame)
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  MyMongoLib.putGame = (game_id, updatedGame) =>
    new Promise((resolve, reject) => {
      console.log("Put Game - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Games");

      return collection
        .updateOne({ _id: ObjectId(game_id) }, updatedGame)
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  MyMongoLib.deleteGame = game_id =>
    new Promise((resolve, reject) => {
      console.log("Delete Game - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Games");

      return collection
        .deleteOne({ _id: ObjectId(game_id) })
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  /*
  ------------------------ CHATS ---------------------------------------------------
  */
  MyMongoLib.getChats = () =>
    new Promise((resolve, reject) => {
      console.log("Get Chats - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Chats");

      return collection
        .find({})
        .toArray()
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  MyMongoLib.getChatsByUserMail = user_mail =>
    new Promise((resolve, reject) => {
      console.log("Get Chats by user mail - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Chats");

      MyMongoLib.getUser(user_mail)
        .then(docs => {
          collection
            .find({ users: { $elemMatch: { user_id: docs[0]._id + "" } } })
            .toArray()
            .then(data => {
              resolve(data);
            })
            .catch(reject);
        })
        .catch(reject);
    });

  MyMongoLib.getChatByQuestId = quest_id =>
    new Promise((resolve, reject) => {
      console.log("Get Chats by quest_id - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Chats");

      return collection
        .find({ quest_id: quest_id })
        .toArray()
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  MyMongoLib.getChat = chat_id =>
    new Promise((resolve, reject) => {
      console.log("Get Chat - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Chats");

      return collection
        .find({ _id: ObjectId(chat_id) })
        .toArray()
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  MyMongoLib.postChat = newChat =>
    new Promise((resolve, reject) => {
      console.log("Post Chat - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Chats");

      return collection
        .insertOne(newChat)
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  MyMongoLib.putChat = (chat_id, updatedChat) =>
    new Promise((resolve, reject) => {
      console.log("Put Chat - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Chats");

      return collection
        .updateOne({ _id: ObjectId(chat_id) }, updatedChat)
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  MyMongoLib.deleteChat = chat_id =>
    new Promise((resolve, reject) => {
      console.log("Delete Chat - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Chats");

      return collection
        .deleteOne({ _id: ObjectId(chat_id) })
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  /*
  ------------------------ USER_GAME_INFO ---------------------------------------------------
  */
  MyMongoLib.getUSers_Games = () =>
    new Promise((resolve, reject) => {
      console.log("Get Users_Games Info - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Users_Games");

      return collection
        .find({})
        .toArray()
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  MyMongoLib.getUser_GameByUser = user_id =>
    new Promise((resolve, reject) => {
      console.log("Get User_Game Info - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Users_Games");

      return collection
        .find({ user_id: user_id })
        .toArray()
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  MyMongoLib.getUserStats = (user_id, game_id) =>
    new Promise((resolve, reject) => {
      console.log("Get User Stats - Connected correctly to server");
      console.log(user_id);
      console.log(game_id);

      const db = client.db(dbName);
      const collection = db.collection("Users_Games");

      return collection
        .find({ user_id: user_id, game_id: ObjectId(game_id) })
        .toArray()
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  MyMongoLib.postUser_Game = newUser_Game =>
    new Promise((resolve, reject) => {
      console.log("Post User_Game - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Users_Games");

      return collection
        .insertOne(newUser_Game)
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  /*MyMongoLib.putUser_Game = (user_game_id, updatedUser_Game) =>
    new Promise((resolve, reject) => {
      // Use connect method to connect to the Server
      client.connect((err, client) => {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Put User_Game - Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection("Users_Games");

        return collection
          .updateOne({ _id: ObjectId(user_game_id) }, updatedUser_Game)
          .then(data => {
            client.close();
            resolve(data);
          })
          .catch(reject);
      });
    });*/

  MyMongoLib.deleteUser_Game = user_game_id =>
    new Promise((resolve, reject) => {
      console.log("Delete User_Game - Connected correctly to server");

      const db = client.db(dbName);
      const collection = db.collection("Users_Games");

      return collection
        .deleteOne({ _id: ObjectId(user_game_id) })
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });

  //----------------- Listening to Changes -------------------------------

  MyMongoLib.listenToChanges = cbk => {
    client.connect((err, client) => {
      if (err !== null) {
        console.error(err);
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

      csCursorQuest.on("change", (/*data*/) => {
        console.log("Quests changed"); /* data */
        MyMongoLib.getQuests().then(docs =>
          cbk(JSON.stringify({ type: "quests", data: docs }))
        );
      });

      csCursorGames.on("change", () => {
        console.log("Games changed");
        MyMongoLib.getGames().then(docs =>
          cbk(JSON.stringify({ type: "games", data: docs }))
        );
      });

      csCursorChats.on("change", () => {
        console.log("Chats changed");
        MyMongoLib.getChats().then(docs =>
          cbk(JSON.stringify({ type: "chats", data: docs }))
        );
      });
    });
  };

  return MyMongoLib;
};

module.exports = MyMongoLib;
