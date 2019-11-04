import React, { useState, useEffect } from "react";
import "./App.css";
import Inicio from "./Inicio.js";
import TableroMisiones from "./TableroMisiones.js";
import Navbar from "./Navbar.js";
import MisMisiones from "./MisMisiones.js";
import CrearMision from "./CrearMision.js";
import { HashRouter, Switch, Route } from "react-router-dom";

const App = (props) => {
  const [docs, setDocs] = useState([]);
  const [err, setErr] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");

  const getUser = (userMail) => { setEmail(userMail); };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");
    ws.onopen = () => {
      console.log("connnected to ws");

      ws.onmessage = msg => {
        console.log("got ws data", msg);
        setDocs(JSON.parse(msg.data));
      };
    };

    if(email !== "")
    {
      fetch("/users/" + email)
        .then(res => res.json())
        .then(responseUser => {
          setUser(responseUser);
        })
        .catch(err => setErr(err));
    }

  }, [email]);

  const renderDocs = () => docs.map(d => <div key={d.name}>{d.name}</div>);

  return (
    <div className="App">
      <HashRouter>
      <Navbar currentUser={user} />
      {/* envolvemos nuestra aplicación en el Router  */}
      <Switch>
        {/* también la envolvemos en el componente Switch */}
        <Route
          path="/"
          render={propiedades => (
            <Inicio {...propiedades}
              currentUser={user}
              getUser={getUser} />
          )}
          exact
        />
        <Route
          path="/tablero"
          render={propiedades => (
            <TableroMisiones {...propiedades}
              currentUser={user} />
          )}
          exact
        />
        <Route
          path="/mis-misiones"
          render={propiedades => (
            <MisMisiones {...propiedades}
              currentUser={user} />
          )}
          exact
        />
        <Route
          path="/crear-mision"
          render={propiedades => (
            <CrearMision {...propiedades}
              currentUser={user} />
          )}
          exact
        />
        {/* y creamos nuestras rutas */}
      </Switch>
    </HashRouter>
      {/*{err}
      {renderDocs()}*/}
    </div>
  );
};

export default App;
