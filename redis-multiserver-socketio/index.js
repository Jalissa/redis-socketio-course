const express = require('express'),
    process = require('process'),
    config = require('../config'),
    socketioRedis = require('socket.io-redis')
    socketio = require('socket.io');

const app = express();
const server = app.listen(process.argv[2]);
const io = socketio(server);

app.use(express.static('static'));

io.adapter(socketioRedis({host: config.redisHost, port: config.redisPort}));
io.on('connection', socket => {
   socket.on('room.join', room => {
     console.log(socket.rooms);
     Object.keys(socket.rooms).filter(r => r != socket.id)
     .forEach(r => socket.leave(r));

     setTimeout(() => {
      socket.join(room);
      socket.emit('event', `Joined room ${room}`);
      socket.broadcast.to(room).emit('event', `Someone joined room ${room}`);
     }, 0);
   });

   socket.on('event', e => {
     socket.broadcast.to(e.room).emit('event', `${e.name} says Hello!`);
   });
});




