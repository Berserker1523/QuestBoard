import React, { useState, useEffect } from "react";
import "./App.css";
import Inicio from "./Inicio.js";
import SignUp from "./SignUp.js";
import TableroMisiones from "./TableroMisiones.js";
import Navbar from "./Navbar.js";
import MisMisiones from "./MisMisiones.js";
import CrearMision from "./CrearMision.js";
import Chats from "./Chats.js";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

const App = props => {
  /*const [docs, setDocs] = useState([]);
  const [err, setErr] = useState("");*/
  const [user, setUser] = useState(null);
  const [quests, setQuests] = useState([]);
  const [questsError, setQuestsError] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!connected) {
      const ws = new WebSocket("ws://localhost:3001");
      ws.onopen = () => {
        console.log("connnected to ws");
        setConnected(true);
        ws.onmessage = msg => {
          let res = JSON.parse(msg.data);
          console.log("got ws data", res);
          if (res.type === "quests") {
            setQuests(res.data);
          }
        };
      };
    }
  }, [connected, user, quests]);

  const GetQuests = () => {
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
              <Inicio {...propiedades} setUser={setUser} />
            )}
            exact
          />
          <Route
            path="/signup"
            render={propiedades => (
              <SignUp {...propiedades} setUser={setUser} />
            )}
            exact
          />
          <Route
            path="/tablero"
            render={propiedades => (
              <TableroMisiones
                {...propiedades}
                currentUser={user}
                GetQuests={GetQuests}
                quests={quests}
                questsError={questsError}
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
              <Chats {...propiedades} currentUser={user} />
            )}
            exact
          />
          {/* y creamos nuestras rutas */}
        </Switch>
      </HashRouter>
    </div>
  );
};

export default App;
