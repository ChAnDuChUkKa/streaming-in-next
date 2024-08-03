// server.ts
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server as SocketIOServer, Socket } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  const io = new SocketIOServer(server);

  io.on('connection', (socket: Socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

    // Simulate data update
    setInterval(() => {
      const newData = { /* simulated data */ };
      socket.emit('dataUpdated', newData);
    }, 5000); // Emit update every 5 seconds
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err?: Error) => {
    if (err) throw err;
    console.log(`Server listening on http://localhost:${port}`);
  });
});
