const nodeHttp = require("node:http")
const next = require("next")
const server = require("socket.io");
const { socket } = require("../fomofactory/src/socket");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = nodeHttp.createServer(handler);

  const io = new server.Server(httpServer);

  io.on("connection", (socket) => {
    console.log("ON SOCKET CONNECTION")
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });

    console.log("EMITTING")
    
    



});