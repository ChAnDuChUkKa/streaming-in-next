const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req: any, res: any) => {
    handle(req, res);
  });

  const io = new Server(server);

  io.on('connection', (socket: { on: (arg0: string, arg1: () => void) => void; }) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  server.listen(3000, (err: any) => {
    if (err) throw err;
    console.log('Server running on http://localhost:3000');
  });
});