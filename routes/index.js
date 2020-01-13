const express = require("express");
const router = express.Router();

const MyMongoLib = require("../MyMongoLib");
const myMongoLib = MyMongoLib();

const lolChampionInfo = require("../public/champion.json");

/* GET home page. */
router.get("/", function(req, res /*, next*/) {
  res.render("index", { title: "Express" });
});

/*
  ------------------------------- USERS ----------------------------------------
*/

//Podrian comentar un poco mas los métodos para indicar que hacen
router.get("/users", (req, res) => {
  myMongoLib
    .getUsers()
    .then(docs => res.send(docs))
    .catch(err => res.send({ err: true, msg: err }));
});

router.get("/users/:user_mail", (req, res) => {
  const user_mail = req.params.user_mail;
  myMongoLib
    .getUser(user_mail)
    .then(docs => {
      docs.length > 0 ? res.send(docs[0]) : res.status(404).send("Not found.");
    })
    .catch(err => res.send({ err: true, msg: err }));
});

router.post("/users", (req, res) => {
  const user_name = req.body.name;
  const user_mail = req.body.mail;
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

router.get("/users/:user_mail/quests", (req, res) => {
  const user_mail = req.params.user_mail;

  myMongoLib
    .getQuestsByUserMail(user_mail)
    .then(docs => res.send(docs))
    .catch(err => res.send({ err: true, msg: err }));
});

router.post("/quests", (req, res) => {
  const quest_name = req.body.name;
  const quest_description = req.body.description;
  const quest_startDate = new Date().toString();
  const quest_finishDate = req.body.finishDate;
  const quest_minPlayers = req.body.minPlayers;
  const quest_maxPlayers = req.body.maxPlayers;
  const quest_completed = false;
  const quest_owner = req.body.owner;
  const quest_players = req.body.players;
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
    .then(docs => {
      if (quest_minPlayers == 1) {
        let messages = [];
        let promises = quest_players.map(player => {
          return new Promise((resolve, reject) => {
            myMongoLib
              .getUserStats(player._id, quest_game._id)
              .then(docs => {
                messages.push({
                  _id: player._id,
                  name: player.name,
                  date: new Date(),
                  message: messageBySummonerStats(docs[0])
                });
                resolve();
              })
              .catch(err => {
                console.error(
                  "No fue posible obtener los stats del jugador: " +
                    player._id +
                    " " +
                    err
                );
                reject();
              });
          });
        });

        Promise.all(promises).then(() => {
          const new_chat = {
            quest_id: docs.ops[0]._id.toString(),
            quest_name: quest_name,
            players: quest_players,
            messages: messages
          };

          myMongoLib.postChat(new_chat);
        });
      }

      res.send(docs.ops[0]);
    })
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

  let updated_quest = {
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

  myMongoLib.getQuest(quest_id).then(quest => {
    const previousQuest = quest[0];

    myMongoLib.getChatByQuestId(quest_id).then(chat => {
      if (chat.length === 0 && quest_players.length == quest_minPlayers) {
        let messages = [];
        let promises = quest_players.map(player => {
          return new Promise((resolve, reject) => {
            myMongoLib
              .getUserStats(player._id, quest_game._id)
              .then(docs => {
                messages.push({
                  _id: player._id,
                  name: player.name,
                  date: new Date(),
                  message: messageBySummonerStats(docs[0])
                });
                resolve();
              })
              .catch(err => {
                console.error(
                  "No fue posible obtener los stats del jugador: " +
                    player._id +
                    " " +
                    err
                );
                reject();
              });
          });
        });

        Promise.all(promises).then(() => {
          const new_chat = {
            quest_id: quest_id,
            quest_name: quest_name,
            players: quest_players,
            messages: messages
          };

          myMongoLib.postChat(new_chat);
        });
      } else if (
        previousQuest.players.length < quest_players.length &&
        chat.length > 0
      ) {
        const obtainedChat = chat[0];

        const lastPlayer = quest_players[quest_players.length - 1];
        console.log(lastPlayer);
        const fecthPlayerStat = new Promise((resolve, reject) => {
          myMongoLib
            .getUserStats(lastPlayer._id, quest_game._id)
            .then(docs => {
              obtainedChat.messages.push({
                _id: lastPlayer._id,
                name: lastPlayer.name,
                date: new Date(),
                message: messageBySummonerStats(docs[0])
              });
              resolve();
            })
            .catch(err => {
              console.error(
                "No fue posible obtener los stats del jugador: " +
                  lastPlayer._id +
                  " " +
                  err
              );
              reject();
            });
        });

        fecthPlayerStat.then(() => {
          const updated_chat = {
            $set: {
              messages: obtainedChat.messages
            }
          };
          myMongoLib.putChat(obtainedChat._id, updated_chat);
        });
      } else if (
        previousQuest.players.length > quest_players.length &&
        chat.length > 0
      ) {
        const obtainedChat = chat[0];

        const lastPlayer =
          previousQuest.players[previousQuest.players.length - 1];

        obtainedChat.messages.push({
          _id: lastPlayer._id,
          name: lastPlayer.name,
          date: new Date(),
          message: "El usuario se ha ido de la misión"
        });

        const updated_chat = {
          $set: {
            messages: obtainedChat.messages
          }
        };
        myMongoLib.putChat(obtainedChat._id, updated_chat);
      }
    });
  });

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
  const game_platform = req.body.platform;
  const game_activeQuests = [];
  const game_completedQuests = [];

  const new_game = {
    name: game_name,
    genre: game_genre,
    description: game_description,
    logo: game_logo,
    platform: game_platform,
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
  const game_platform = req.body.platform;
  const game_activeQuests = req.body.activeQuests;
  const game_completedQuests = req.body.completedQuests;

  const updated_game = {
    $set: {
      name: game_name,
      genre: game_genre,
      description: game_description,
      logo: game_logo,
      platform: game_platform,
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

/*
  ------------------------------- CHATS  ----------------------------------------
*/

router.get("/chats", (req, res) => {
  myMongoLib
    .getChats()
    .then(docs => res.send(docs))
    .catch(err => res.send({ err: true, msg: err }));
});

router.get("/chats/:chat_id", (req, res) => {
  const chat_id = req.params.chat_id;

  myMongoLib
    .getChat(chat_id)
    .then(docs => res.send(docs[0]))
    .catch(err => res.send({ err: true, msg: err }));
});

router.get("/users/:user_mail/chats", (req, res) => {
  const user_mail = req.params.user_mail;

  myMongoLib
    .getChatsByUserMail(user_mail)
    .then(docs => res.send(docs))
    .catch(err => res.send({ err: true, msg: err }));
});

router.post("/chats", (req, res) => {
  const chat_name = req.body.name;
  const chat_quest = req.body.quest;
  const chat_users = req.body.users;
  const chat_messages = [];

  const new_chat = {
    name: chat_name,
    quest: chat_quest,
    users: chat_users,
    messages: chat_messages
  };

  myMongoLib
    .postChat(new_chat)
    .then(docs => res.send(docs.ops[0]))
    .catch(err => res.send({ err: true, msg: err }));
});

router.put("/chats/:chat_id", (req, res) => {
  const chat_id = req.params.chat_id;

  const chat_name = req.body.name;
  const chat_quest = req.body.quest;
  const chat_users = req.body.users;
  const chat_messages = req.body.messages;

  const updated_chat = {
    $set: {
      name: chat_name,
      quest: chat_quest,
      users: chat_users,
      messages: chat_messages
    }
  };

  myMongoLib
    .putChat(chat_id, updated_chat)
    .then(docs => res.send({ updated: docs.modifiedCount }))
    .catch(err => res.send({ err: true, msg: err }));
});

router.put("/chats/:chat_id/new_message", (req, res) => {
  const chat_id = req.params.chat_id;
  const new_message = req.body.message;

  myMongoLib
    .getChat(chat_id)
    .then(docs => {
      const received_chat = docs[0];
      received_chat.messages.push(new_message);
      const updated_chat = {
        $set: {
          messages: received_chat.messages
        }
      };
      myMongoLib
        .putChat(chat_id, updated_chat)
        .then(docs => res.send({ updated: docs.modifiedCount }));
    })
    .catch(err => res.send({ err: true, msg: err }));
});

router.delete("/chats/:chat_id", (req, res) => {
  const chat_id = req.params.chat_id;
  myMongoLib
    .deleteChat(chat_id)
    .then(docs => res.send({ deleted: docs.deletedCount }))
    .catch(err => res.send({ err: true, msg: err }));
});

/*
---------------------------------- Riot Games API --------------------------------------
*/
const fetch = require("node-fetch");

function messageBySummonerStats(lolInfo) {
  const mains_ids = [];

  for (let i = 0; i < 3; i++) {
    mains_ids.push(lolInfo.championStats[i].championId);
  }

  const mains_names = mains_ids.map(id => {
    let champ_name = "";

    Object.values(lolChampionInfo.data).forEach(champ_info =>
      champ_info.key == id ? (champ_name = champ_info.name) : ""
    );

    return champ_name;
  });

  return `Me encantaría jugar con ustedes! Mi summoner name es ${lolInfo.summonerInfo.name}, y mis main son ${mains_names[0]}, ${mains_names[1]} y ${mains_names[2]}`;
}

const fetch_lol_data = (user_game_info, summoner_name, cbk) => {
  fetch(
    `https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner_name}`,
    {
      method: "GET",
      headers: {
        Origin: "https://developer.riotgames.com",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Riot-Token": process.env.RIOT_GAMES_API_KEY
      }
    }
  )
    .then(res => res.json())
    .then(response => {
      console.log("Fetch SUMMONER Response: ");
      console.log(response);
      user_game_info.summonerInfo = response;

      const fetches = [];

      fetches.push(
        fetch(
          `https://la1.api.riotgames.com/lol/league/v4/entries/by-summoner/${user_game_info.summonerInfo.id}`,
          {
            method: "GET",
            headers: {
              Origin: "https://developer.riotgames.com",
              "Accept-Charset":
                "application/x-www-form-urlencoded; charset=UTF-8",
              "X-Riot-Token": process.env.RIOT_GAMES_API_KEY
            }
          }
        )
          .then(res => res.json())
          .then(response => {
            console.log("Fetch LEAGUE Response: ");
            console.log(response);
            user_game_info.leagueStats = response;
          })
      );

      fetches.push(
        fetch(
          `https://la1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${user_game_info.summonerInfo.id}`,
          {
            method: "GET",
            headers: {
              Origin: "https://developer.riotgames.com",
              "Accept-Charset":
                "application/x-www-form-urlencoded; charset=UTF-8",
              "X-Riot-Token": process.env.RIOT_GAMES_API_KEY
            }
          }
        )
          .then(res => res.json())
          .then(response => {
            console.log("Fetch CHAMPION-MASTERY Response: ");
            console.log(response);
            user_game_info.championStats = response;
          })
      );

      fetches.push(
        fetch(
          `https://la1.api.riotgames.com/lol/match/v4/matchlists/by-account/${user_game_info.summonerInfo.accountId}`,
          {
            method: "GET",
            headers: {
              Origin: "https://developer.riotgames.com",
              "Accept-Charset":
                "application/x-www-form-urlencoded; charset=UTF-8",
              "X-Riot-Token": process.env.RIOT_GAMES_API_KEY
            }
          }
        )
          .then(res => res.json())
          .then(response => {
            console.log("Fecth MATCH Response: ");
            console.log(response);
            user_game_info.matchStats = response;
          })
      );

      fetches.push(
        myMongoLib
          .getGameByName("League of Legends")
          .then(docs => {
            console.log("League of legends Info: ");
            console.log(docs);
            user_game_info.game_id = docs[0]._id;
          })
          .catch(err => console.warn(err))
      );

      Promise.all(fetches).then(() => {
        cbk(user_game_info);
      });
    });
};

router.get("/user_game", (req, res) => {
  myMongoLib
    .getUSers_Games()
    .then(docs => res.send(docs))
    .catch(err => res.send({ err: true, msg: err }));
});

router.get("/user_game/user/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  myMongoLib
    .getUser_GameByUser(user_id)
    .then(docs => res.send(docs))
    .catch(err => res.send({ err: true, msg: err }));
});

router.post(
  "/user_game/lol/user/:user_id/summoner/:summoner_name",
  (req, res) => {
    const user_id = req.params.user_id;
    const summoner_name = req.params.summoner_name;

    console.log(`Obtaining data from riot games api of: ${summoner_name}`);

    let user_game_info = {
      user_id: user_id,
      game_id: null,
      summonerInfo: null,
      leagueStats: null,
      championStats: null,
      matchStats: null
    };

    fetch_lol_data(user_game_info, summoner_name, info => {
      myMongoLib
        .postUser_Game(info)
        .then(docs => res.send(docs.ops[0]))
        .catch(err => res.send({ err: true, msg: err }));
    });
  }
);

router.put(
  "/user_game/:user_game_id/user/:user_id/summoner/:summoner_name",
  (req, res) => {
    const user_game_id = req.params.user_game_id;
    const user_id = req.params.user_id;
    const summoner_name = req.params.summoner_name;

    console.log(`Obtaining data from riot games api of: ${summoner_name}`);

    let user_game_info = {
      user_id: user_id,
      game_id: null,
      summonerInfo: null,
      leagueStats: null,
      championStats: null,
      matchStats: null
    };

    myMongoLib
      .deleteUser_Game(user_game_id)
      .then(() => {
        fetch_lol_data(user_game_info, summoner_name, info => {
          myMongoLib
            .postUser_Game(info)
            .then(docs => res.send(docs.ops[0]))
            .catch(err => res.send({ err: true, msg: err }));
        });
      })
      .catch(err => res.send({ err: true, msg: err }));
  }
);

router.delete("/user_game/lol/:user_game_id", (req, res) => {
  const user_game_id = req.params.user_game_id;
  myMongoLib
    .deleteUser_Game(user_game_id)
    .then(docs => res.send({ deleted: docs.deletedCount }))
    .catch(err => res.send({ err: true, msg: err }));
});

module.exports = router;
