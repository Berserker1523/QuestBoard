import React, { useState, useEffect } from "react";
import "./App.css";
import Inicio from "./Inicio.js";
import TableroMisiones from "./TableroMisiones.js";
import Navbar from "./Navbar.js";
import { HashRouter, Switch, Route } from "react-router-dom";

const App = (props) => {
  const [docs, setDocs] = useState([]);
  const [err, setErr] = useState("");
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [page, setPage] = useState("Inicio");

  const getUser = (userMail) => { setEmail(userMail); setPage("Tablero"); };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");
    ws.onopen = () => {
      console.log("connnected to ws");

      ws.onmessage = msg => {
        console.log("got ws data", msg);
        setDocs(JSON.parse(msg.data));
      };
    };

    fetch("data")
      .then(res => res.json())
      .then(data => {
        if (data.err) {
          setErr(JSON.stringify(data.msg));
        } else {
          setDocs(data);
        }
      });

    fetch("/users/" + email)
      .then(res => res.json())
      .then(responseUser => {
        if (responseUser.err) {
          setErr(JSON.stringify(responseUser.msg));
        } else {
          setUser(responseUser);
        }
      });
  }, []);

  const renderDocs = () => docs.map(d => <div key={d.name}>{d.name}</div>);

  return (
    <div className="App">
      <HashRouter>
      <Navbar currentUser={user} paginaActual={page}/>
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
        {/* y creamos nuestras rutas */}
      </Switch>
    </HashRouter>
      {/*{err}
      {renderDocs()}*/}
    </div>
  );
};

export default App;
