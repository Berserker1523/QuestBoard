const express = require("express");
const router = express.Router();

const MyMongoLib = require("../MyMongoLib");
const myMongoLib = MyMongoLib();

/* GET home page. */
router.get("/", function(req, res /*, next*/) {
  res.render("index", { title: "Express" });
});

/*
  ------------------------------- USERS ----------------------------------------
*/

router.get("/users", (req, res) => {
  myMongoLib
    .getUsers()
    .then(docs => res.send(docs))
    .catch(err => res.send({ err: true, msg: err }));
});

router.get("/users/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  //console.log(`GET users/:user_name - param: ${user_name}`);
  myMongoLib
    .getUser(user_id)
    .then(docs => res.send(docs[0]))
    .catch(err => res.send({ err: true, msg: err }));
});

router.post("/users", (req, res) => {
  const user_name = req.body.name;
  const user_mail = req.body.mail;
  const user_password = req.body.password;
  const user_age = req.body.age;
  const user_avatar = req.body.avatar;
  const user_country = req.body.country;
  const user_ownQuests = [];
  const user_activeQuests = [];
  const user_completedQuests = [];
  const user_ownGames = [];

  const new_user = {
    name: user_name,
    mail: user_mail,
    password: user_password,
    age: user_age,
    avatar: user_avatar,
    country: user_country,
    ownQuests: user_ownQuests,
    activeQuests: user_activeQuests,
    completedQuests: user_completedQuests,
    ownGames: user_ownGames
  };

  myMongoLib
    .postUser(new_user)
    .then(docs => res.send(docs.ops[0]))
    .catch(err => res.send({ err: true, msg: err }));
});

router.put("/users/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  const user_name = req.body.name;
  const user_mail = req.body.mail;
  const user_password = req.body.password;
  const user_age = req.body.age;
  const user_avatar = req.body.avatar;
  const user_country = req.body.country;
  const user_ownQuests = req.body.ownQuests;
  const user_activeQuests = req.body.activeQuests;
  const user_completedQuests = req.body.completedQuests;
  const user_ownGames = req.body.ownGames;

  const updated_user = {
    $set: {
      name: user_name,
      mail: user_mail,
      password: user_password,
      age: user_age,
      avatar: user_avatar,
      country: user_country,
      ownQuests: user_ownQuests,
      activeQuests: user_activeQuests,
      completedQuests: user_completedQuests,
      ownGames: user_ownGames
    }
  };

  myMongoLib
    .putUser(user_id, updated_user)
    .then(docs => res.send({ updated: docs.modifiedCount }))
    .catch(err => res.send({ err: true, msg: err }));
});

router.delete("/users/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  myMongoLib
    .deleteUser(user_id)
    .then(docs => res.send({ deleted: docs.deletedCount }))
    .catch(err => res.send({ err: true, msg: err }));
});

/*
  ------------------------------- QUESTS ----------------------------------------
*/

router.get("/quests", (req, res) => {
  myMongoLib
    .getQuests()
    .then(docs => res.send(docs))
    .catch(err => res.send({ err: true, msg: err }));
});

router.get("/quests/:quest_id", (req, res) => {
  const quest_id = req.params.quest_id;

  myMongoLib
    .getQuest(quest_id)
    .then(docs => res.send(docs[0]))
    .catch(err => res.send({ err: true, msg: err }));
});

router.post("/quests", (req, res) => {
  const quest_name = req.body.name;
  const quest_description = req.body.description;
  const quest_startDate = new Date();
  const quest_finishDate = req.body.finishDate;
  const quest_minPlayers = req.body.minPlayers;
  const quest_maxPlayers = req.body.maxPlayers;
  const quest_completed = false;
  const quest_owner = req.body.owner;
  const quest_players = [];
  const quest_game = req.body.game;

  console.log("POST QUEST ROUTER");
  console.log(`quest owner: ${quest_owner}`);
  console.log(`quest game: ${quest_game}`);

  const new_quest = {
    name: quest_name,
    description: quest_description,
    startDate: quest_startDate,
    finishDate: quest_finishDate,
    minPlayers: quest_minPlayers,
    maxPlayers: quest_maxPlayers,
    completed: quest_completed,
    owner: quest_owner,
    players: quest_players,
    game: quest_game
  };

  myMongoLib
    .postQuest(new_quest)
    .then(docs => res.send(docs.ops[0]))
    .catch(err => res.send({ err: true, msg: err }));
});

router.put("/quests/:quest_id", (req, res) => {
  const quest_id = req.params.quest_id;

  const quest_name = req.body.name;
  const quest_description = req.body.description;
  const quest_startDate = req.body.startDate;
  const quest_finishDate = req.body.finishDate;
  const quest_minPlayers = req.body.minPlayers;
  const quest_maxPlayers = req.body.maxPlayers;
  const quest_completed = req.body.completed;
  const quest_owner = req.body.owner;
  const quest_players = req.body.players;
  const quest_game = req.body.game;

  const updated_quest = {
    $set: {
      name: quest_name,
      description: quest_description,
      startDate: quest_startDate,
      finishDate: quest_finishDate,
      minPlayers: quest_minPlayers,
      maxPlayers: quest_maxPlayers,
      completed: quest_completed,
      owner: quest_owner,
      players: quest_players,
      game: quest_game
    }
  };

  myMongoLib
    .putQuest(quest_id, updated_quest)
    .then(docs => res.send({ updated: docs.modifiedCount }))
    .catch(err => res.send({ err: true, msg: err }));
});

router.delete("/quests/:quest_id", (req, res) => {
  const quest_id = req.params.quest_id;
  myMongoLib
    .deleteQuest(quest_id)
    .then(docs => res.send({ deleted: docs.deletedCount }))
    .catch(err => res.send({ err: true, msg: err }));
});

/*
  ------------------------------- GAMES ----------------------------------------
*/

router.get("/games", (req, res) => {
  myMongoLib
    .getGames()
    .then(docs => res.send(docs))
    .catch(err => res.send({ err: true, msg: err }));
});

router.get("/games/:game_id", (req, res) => {
  const game_id = req.params.game_id;

  myMongoLib
    .getGame(game_id)
    .then(docs => res.send(docs[0]))
    .catch(err => res.send({ err: true, msg: err }));
});

router.post("/games", (req, res) => {
  const game_name = req.body.name;
  const game_genre = req.body.genre;
  const game_description = req.body.description;
  const game_logo = req.body.logo;
  const game_activeQuests = [];
  const game_completedQuests = [];

  const new_game = {
    name: game_name,
    genre: game_genre,
    description: game_description,
    logo: game_logo,
    activeQuests: game_activeQuests,
    completedQuests: game_completedQuests
  };

  myMongoLib
    .postGame(new_game)
    .then(docs => res.send(docs.ops[0]))
    .catch(err => res.send({ err: true, msg: err }));
});

router.put("/games/:game_id", (req, res) => {
  const game_id = req.params.game_id;

  const game_name = req.body.name;
  const game_genre = req.body.genre;
  const game_description = req.body.description;
  const game_logo = req.body.logo;
  const game_activeQuests = req.body.activeQuests;
  const game_completedQuests = req.body.completedQuests;

  const updated_game = {
    $set: {
      name: game_name,
      genre: game_genre,
      description: game_description,
      logo: game_logo,
      activeQuests: game_activeQuests,
      completedQuests: game_completedQuests
    }
  };

  myMongoLib
    .putGame(game_id, updated_game)
    .then(docs => res.send({ updated: docs.modifiedCount }))
    .catch(err => res.send({ err: true, msg: err }));
});

router.delete("/games/:game_id", (req, res) => {
  const game_id = req.params.game_id;
  myMongoLib
    .deleteGame(game_id)
    .then(docs => res.send({ deleted: docs.deletedCount }))
    .catch(err => res.send({ err: true, msg: err }));
});

module.exports = router;
