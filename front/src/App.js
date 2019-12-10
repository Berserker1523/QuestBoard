import React, { useState, useEffect } from "react";
import "./App.css";
import Inicio from "./Inicio.js";
import SignUp from "./SignUp.js";
import TableroMisiones from "./TableroMisiones.js";
import TableroJuegos from "./TableroJuegos.js";
import Navbar from "./Navbar.js";
import MisMisiones from "./MisMisiones.js";
import CrearMision from "./CrearMision.js";
import Chats from "./Chats.js";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

const App = props => {
  /*const [docs, setDocs] = useState([]);
  const [err, setErr] = useState("");*/
  const backUrl = "http://localhost:3001";
  const [connected, setConnected] = useState(false);

  const [user, setUser] = useState(null);
  const [quests, setQuests] = useState([]);
  const [questsError, setQuestsError] = useState("");
  const [games, setGames] = useState([]);
  const [gamesError, setGamesError] = useState("");

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    if (!connected) {
      console.log(window.location.origin.toString().replace(/^http/, "ws"));
      const ws = new WebSocket(
        "ws://localhost:3001"
          .toString()
          .replace(/^http/, "ws")
      );
      ws.onopen = () => {
        console.log("connnected to ws");
        setConnected(true);
        ws.onmessage = msg => {
          let res = JSON.parse(msg.data);
          console.log("got ws data", res);
          if (res.type === "quests") {
            setQuests(res.data);
          }
          if (res.type === "chats") {
            setChats(res.data);
          }
        };
      };
    }

    if(user===null)
    {
      fetch("/auth/getUser")
        .then(res => res.json())
        .then(_user => {
          if (_user) {
            console.log(_user.displayName);
            fetch("/users/"+_user.displayName)
              .then(res => res.json())
              .then(data => {
                if(data)
                {
                  setUser(data); 
                }
                else
                {
                  fetch("/users", {
                    method: "POST",
                    body: JSON.stringify({
                        name : _user.nickname,
                        mail : _user.displayName,
                        password : "clave ultra-secreta",
                        age : 20,
                        avatar : "",
                        country : "Colombia",
                    }),
                    headers: {
                      "Content-Type": "application/json"
                    }
                  });

                  fetch("/users/"+_user.displayName)
                    .then(res => res.json())
                    .then(data => setUser(data));

                  fetch("/users/"+_user.displayName+"/chats")
                    .then(res => res.json())
                    .then(data => setChats(data))
                    .catch();
                }
          });
        }
      });

      fetch("/quests")
        .then(res => res.json())
        .then(data => {
          setQuests(data);
          setQuestsError("");
        })
        .catch(err =>
          setQuestsError(
            "No fue posible obtener las misiones, por favor intentelo de nuevo"
          )
      );
    }
  }, [connected, user]);

  const getQuests = () => {
    fetch("/quests")
      .then(res => res.json())
      .then(data => {
        setQuests(data);
        setQuestsError("");
      })
      .catch(err =>
        setQuestsError(
          "No fue posible obtener las misiones, por favor intentelo de nuevo"
        )
      );
  };

  const getGames = () => {
    fetch("/games")
      .then(res => res.json())
      .then(data => {
        setGames(data);
        setGamesError("");
      })
      .catch(err =>
        setGamesError(
          "No fue posible obtener infromación de los juegos disponibles, por favor intentelo de nuevo"
        )
      );
  };

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
        {/* envolvemos nuestra aplicación en el Router  */}
        <Switch>
          {/* también la envolvemos en el componente Switch */}
          <Route
            path="/"
            render={propiedades => (
              <Inicio {...propiedades} quests={quests} />
            )}
            exact
          />
          <Route
            path="/tablero"
            render={propiedades => (
              <TableroMisiones
                {...propiedades}
                currentUser={user}
                GetQuests={getQuests}
                quests={quests}
                questsError={questsError}
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
              <MisMisiones
                {...propiedades}
                quests={quests}
                currentUser={user}
              />
            )}
            exact
          />
          <Route
            path="/crear-mision"
            render={propiedades => (
              <CrearMision {...propiedades} currentUser={user} />
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
          {/* y creamos nuestras rutas */}
        </Switch>
      </HashRouter>
//Agreguen instrucciones claras de que es lo que hace y como se hace pues no es tan intuitivo y deberia ser lo primero que ve el usuario en este punto.
    </div>
  );
};

export default App;
