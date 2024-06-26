import { createServer } from 'http';
import { Server } from 'socket.io';

export default function connectToSocketServer() {
  const httpServer = createServer();
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Connected: ', socket.id);

    socket.on('join_room', (data) => {
      socket.join(data);
      console.log(`User ${socket.id} joined room ${data}`);
    });

    socket.on('send_message', (data) => {
      socket.to(data.room).emit('receive_message', data);
      console.log('Message: ', data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected: ', socket.id);
    });
  });

  httpServer.listen(3001);
}
