const process = require('process'),
    config = require('../config.js'),
    socketioEmitter = require('socket.io-emitter');

    const io = socketioEmitter({host: config.redisHost, port: config.redisPort});

    io.to(process.argv[2]).emit('event', process.argv[3]);

    setTimeout(() => {process.exit(0)}, 1000);