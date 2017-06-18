const express = require('express'),
    socketio = require('socket.io');

const app = express();
const server = app.listen(8080);
const io = socketio(server);

app.use(express.static('static'));

const namespace = io.of('/namespace');

namespace.on('connection', socket => {
    namespace.emit('event', 'Connected to namespace');
    //this is a differente namespace
    io.emit('event', 'normal');
});

