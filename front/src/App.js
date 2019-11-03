import React, { useState, useEffect } from "react";
import "./App.css";

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
      {err}
      {renderDocs()}
    </div>
  );
};

export default App;
