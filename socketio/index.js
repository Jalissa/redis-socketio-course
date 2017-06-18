const express = require('express'),
    socketio = require('socket.io'),
    redis = require('./redis');

const app = express();
const server = app.listen(8080);
const io = socketio(server);

app.use(express.static('static'));
/*
io.on('connection', socket => {
    socket.on('name', (name) => {
        console.log(`${name} says hello!`);
        // use io to emit to all connections
        io.emit('name', name);
    });
});*/

const errorEmit = (socket) => {
    return (err) => {
        console.log(err);
        socket.broadcast.emit('user.events', 'Something went wrong');
    };
};

io.on('connection', socket => {
    // To everyone except for this connection
    socket.broadcast.emit('user.events', 'Someone has joined');
    socket.on('name', (name) => {
        redis.storeUser(socket.id, name)
        .then(() => {
            console.log(`${name} says hello!`);
            socket.broadcast.emit('name', name);        
        }, errorEmit(socket));
    });

    socket.on('disconnect', () => {
        redis.getUser(socket.id)
        .then((user) => {
            if(user === null) return 'Someone'
            else return user;
        })
        .then((user) => {
            console.log(`${user} left`);
            socket.broadcast.emit('user.events', `${user} left`);
        }, errorEmit(socket));
    })
});


