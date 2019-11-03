const WebSocket = require("ws");

const MyWsLib = function() {
  const MyWsLib = this || {};
  const clients = [];

  MyWsLib.setupWS = server => {
    const wss = new WebSocket.Server({ server });

    console.log("setting up Web Socket");

    wss.on("connection", ws => {
      ws.isAlive = true;

      ws.on("pong", () => {
        ws.isAlive = true;
      });

      ws.on("error", err => {
        console.warn(`Client disconnected - reason: ${err}`);
      });

      console.log("Accepting new connection");
      clients.push(ws);
    });

    setInterval(() => {
      console.log(`Number of actual clients: ${clients.length}`);

      clients.forEach((ws, i) => {
        console.log(
          `Checking connection of client: ${i} - alive: ${ws.isAlive}`
        );
        if (!ws.isAlive) {
          ws.terminate();
          clients.splice(i, 1);
          return;
        }

        ws.isAlive = false;
        ws.ping(null, undefined);
      });
    }, 10000);
  };

  MyWsLib.notifyAll = data => {
    for (let ws of clients) {
      ws.send(data);
    }
  };

  return MyWsLib;
};

module.exports = MyWsLib;
