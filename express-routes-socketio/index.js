const express = require('express'),
    router = require('./routes'),
    sockets = require('./sockets'),
    socketio = require('socket.io');

const app = express();
const server = app.listen(8080);
const io = socketio(server);

app.use('/', router);

const bears = io.of('/bears');
const cubs = io.of('/cubs');

bears.on('connection', sockets.bearsNamespace);
cubs.on('connection', sockets.cubsNamespace);

io.on('connection', socket => {
   
});


