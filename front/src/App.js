import React, { useState, useEffect } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import Inicio from "./Inicio.js";
import TableroMisiones from "./TableroMisiones.js";
import TableroJuegos from "./TableroJuegos.js";
import Navbar from "./Navbar.js";
import MisMisiones from "./MisMisiones.js";
import CrearMision from "./CrearMision.js";
import Chats from "./Chats.js";

import { getAPI, postAPI } from "./API/BasicAPI";

const App = props => {
  const [connected, setConnected] = useState(false);

  const [user, setUser] = useState(null);
  const [quests, setQuests] = useState([]);
  const [questsError, setQuestsError] = useState("");
  const [games, setGames] = useState([]);
  const [gamesError, setGamesError] = useState("");

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  const getQuests = () => {
    getAPI("/quests")
      .then(data => {
        setQuests(data);
        setQuestsError(null);
      })
      .catch(err =>
        setQuestsError(
          "No fue posible obtener las misiones, por favor inténtelo de nuevo"
        )
      );
  };

  const getGames = () => {
    getAPI("/games")
      .then(data => {
        setGames(data);
        setGamesError(null);
      })
      .catch(err =>
        setGamesError(
          "No fue posible obtener información de los juegos disponibles, por favor inténtelo de nuevo"
        )
      );
  };

  useEffect(() => {
    if (!connected) {
      console.log(window.location.origin.toString().replace(/^http/, "ws"));
      const ws = new WebSocket(
        "ws://localhost:3001".toString().replace(/^http/, "ws")
      );
      ws.onopen = () => {
        console.log("connnected to ws");
        setConnected(true);
        ws.onmessage = msg => {
          let res = JSON.parse(msg.data);
          console.log("got ws data", res);
          if (res.type === "quests") {
            console.log("App.js: se recibió info de misiones");
            setQuests(res.data);
          }
          if (res.type === "chats") {
            console.log("App.js: se recibió info de chats");
            setChats(res.data);
          }
        };
      };
    }

    if (!user) {
      getAPI("/auth/getUser")
        .then(loggedUser => {
          console.log("loggedUser: ");
          console.log(loggedUser);
          if (loggedUser) {
            console.log(`user: ${loggedUser.displayName}`);
            getAPI(`/users/${loggedUser.displayName}`)
              .then(data => {
                console.log("Get user back response: ");
                console.log(data);

                setUser(data);
              })
              .catch(err => {
                console.log(err);
                //No se encontró un usuario registrado
                if (err instanceof SyntaxError) {
                  console.log("No se encontró un usuario registrado");
                  postAPI("/users", {
                    name: loggedUser.nickname,
                    mail: loggedUser.displayName,
                    age: null,
                    avatar: null,
                    country: null
                  }).then(
                    getAPI(`/users/${loggedUser.displayName}`).then(data => {
                      setUser(data);
                    })
                  );
                }
              });
          }
        })
        .then(() => {
          getQuests();
          getGames();
        });
    }
  }, []);

  const getCurrentChat = currentChatId => {
    fetch("/chats/" + currentChatId)
      .then(res => res.json())
      .then(data => {
        setCurrentChat(data);
      })
      .catch(err => {});
  };

  return (
    <div className="App">
      <HashRouter>
        <Navbar currentUser={user} />
        {user !== null ? <Redirect push to="/tablero" /> : ""}
        <Switch>
          <Route
            path="/"
            render={propiedades => <Inicio {...propiedades} quests={quests} />}
            exact
          />
          <Route
            path="/tablero"
            render={propiedades => (
              <TableroMisiones
                {...propiedades}
                user={user}
                getQuests={getQuests}
                quests={quests}
                questsError={questsError}
                games={games}
                gamesError={gamesError}
              />
            )}
            exact
          />
          <Route
            path="/juegos"
            render={propiedades => (
              <TableroJuegos
                {...propiedades}
                currentUser={user}
                GetGames={getGames}
                games={games}
                gamesError={gamesError}
                setUser={setUser}
              />
            )}
            exact
          />
          <Route
            path="/mis-misiones"
            render={propiedades => (
              <MisMisiones {...propiedades} quests={quests} user={user} />
            )}
            exact
          />
          <Route
            path="/crear-mision"
            render={propiedades => (
              <CrearMision
                {...propiedades}
                games={games}
                currentUser={user}
                setQuestsError={setQuestsError}
              />
            )}
            exact
          />
          <Route
            path="/chats"
            render={propiedades => (
              <Chats
                {...propiedades}
                currentUser={user}
                chats={chats}
                GetCurrentChat={getCurrentChat}
                currentChat={currentChat}
              />
            )}
            exact
          />
        </Switch>
      </HashRouter>
    </div>
  );
};

export default App;
