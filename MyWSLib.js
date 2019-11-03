const WebSocket = require("ws");

const MyWsLib = function() {
  const MyWsLib = this || {};
  const clients = [];

  MyWsLib.setupWS = server => {
    const wss = new WebSocket.Server({ server });

    console.log("seeting up socket");
    wss.on("connection", ws => {
      console.log("Accepting connection");
      clients.push(ws);
    });
  };

  MyWsLib.notifyAll = data => {
    for (let ws of clients) {
      ws.send(data);
    }
  };

  return MyWsLib;
};

module.exports = MyWsLib;
