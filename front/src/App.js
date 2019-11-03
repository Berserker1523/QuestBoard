import React, { useState, useEffect } from "react";
import "./App.css";
import Inicio from "./Inicio.js";
import { HashRouter, Switch, Route } from "react-router-dom";

const App = () => {
  const [docs, setDocs] = useState([]);
  const [err, setErr] = useState("");

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
  }, []);

  const renderDocs = () => docs.map(d => <div key={d.name}>{d.name}</div>);

  return (
    <div className="App">
      <HashRouter>
      {/* envolvemos nuestra aplicación en el Router  */}
      <Switch>
        {/* también la envolvemos en el componente Switch */}
        <Route
          path="/"
          component={Inicio}
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
