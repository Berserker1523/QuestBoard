import React, { useState, useEffect } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import Inicio from "./Inicio.js";
import TableroMisiones from "./TableroMisiones.js";
import TableroJuegos from "./TableroJuegos.js";
import Navbar from "./Navbar.js";
import MisMisiones from "./MisMisiones.js";
import CrearMision from "./CrearMision.js";

import { getAPI, postAPI } from "./API/BasicAPI";

const App = props => {
  const [connected, setConnected] = useState(false);
  const [backURL, setBackURL] = useState("");

  const [user, setUser] = useState(null);
  const [quests, setQuests] = useState([]);
  const [questsError, setQuestsError] = useState("");
  const [games, setGames] = useState([]);
  const [gamesError, setGamesError] = useState("");

  const [chats, setChats] = useState([]);
  //const [chatsError, setChatsError] = useState([]);

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

  const getChats = () => {
    getAPI("/chats")
      .then(data => {
        setChats(data);
        //setChatsError(null);
      })
      .catch(err =>
        /*setChatsError(
          "No fue posible obtener información de los chats, por favor inténtelo de nuevo"
        )*/
        console.error(err)
      );
  };

  useEffect(() => {
    if (!connected) {
      const location_url = window.location.origin;
      let ws;
      if (location_url === "http://localhost:3000") {
        ws = new WebSocket("http://localhost:3001".replace(/^http/, "ws"));
        setBackURL("http://localhost:3001");
      } else {
        ws = new WebSocket(location_url.replace(/^http/, "ws"));
        setBackURL(location_url);
      }

      ws.onopen = () => {
        //console.log("connnected to ws");
        setConnected(true);
        ws.onmessage = msg => {
          let res = JSON.parse(msg.data);
          //console.log("got ws data", res);
          if (res.type === "quests") {
            //console.log("App.js: se recibió info de misiones");
            setQuests(res.data);
          }
          if (res.type === "chats") {
            //console.log("App.js: se recibió info de chats");
            setChats(res.data);
          }
        };
      };
    }

    if (!user) {
      getAPI("/auth/getUser")
        .then(loggedUser => {
          //console.log("loggedUser: ");
          //console.log(loggedUser);
          if (loggedUser) {
            //console.log(`user: ${loggedUser.displayName}`);
            getAPI(`/users/${loggedUser.displayName}`)
              .then(data => {
                //console.log("Get user back response: ");
                //console.log(data);

                setUser(data);
              })
              .catch(err => {
                console.log(err);
                //No se encontró un usuario registrado
                if (err instanceof SyntaxError) {
                  //console.log("No se encontró un usuario registrado");
                  postAPI("/users", {
                    name: loggedUser.nickname,
                    mail: loggedUser.displayName,
                    age: null,
                    avatar: null,
                    country: null
                  }).then(
                    setTimeout(
                      () =>
                        getAPI(`/users/${loggedUser.displayName}`).then(
                          data => {
                            setUser(data);
                          }
                        ),
                      1000
                    )
                  );
                }
              });
          }
        })
        .then(() => {
          getQuests();
          getGames();
          getChats();
        });
    }
  }, []);

  const renderPage = (propiedades, component) => (
    <div className="container-fluid app-container">
      <div className="row">
        <div className="col">
          <Navbar {...propiedades} currentUser={user} backURL={backURL} />
        </div>
      </div>
      <div className="row prueba">
        <div className="col">
          <main>{component}</main>
        </div>
      </div>
    </div>
  );

  return (
    <div className="App">
      <HashRouter>
        {user !== null ? <Redirect push to="/tablero" /> : ""}
        <Switch>
          <Route
            path="/"
            render={propiedades =>
              renderPage(propiedades, <Inicio {...propiedades} />)
            }
            exact
          />
          <Route
            path="/tablero"
            render={propiedades =>
              renderPage(
                propiedades,
                <TableroMisiones
                  {...propiedades}
                  user={user}
                  getQuests={getQuests}
                  quests={quests}
                  questsError={questsError}
                  games={games}
                  gamesError={gamesError}
                  chats={chats}
                />
              )
            }
            exact
          />
          <Route
            path="/juegos"
            render={propiedades =>
              renderPage(
                propiedades,
                <TableroJuegos
                  {...propiedades}
                  currentUser={user}
                  GetGames={getGames}
                  games={games}
                  gamesError={gamesError}
                  setUser={setUser}
                />
              )
            }
            exact
          />
          <Route
            path="/mis-misiones"
            render={propiedades =>
              renderPage(
                propiedades,
                <MisMisiones
                  {...propiedades}
                  quests={quests}
                  user={user}
                  chats={chats}
                />
              )
            }
            exact
          />
          <Route
            path="/crear-mision"
            render={propiedades =>
              renderPage(
                propiedades,
                <CrearMision
                  {...propiedades}
                  games={games}
                  currentUser={user}
                  setQuestsError={setQuestsError}
                />
              )
            }
            exact
          />
        </Switch>
      </HashRouter>
    </div>
  );
};

export default App;
