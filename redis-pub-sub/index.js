const express = require('express'),
    config = require('../config.js'),
    process = require('process'),
    redis = require('redis');

const app = express();

const redisClient = redis.createClient(config.redisPort, config.redisHost);
const publishClient = redis.createClient(config.redisPort, config.redisHost);

redisClient.on('message', (channel, message) => {
    console.log(message);
});

redisClient.subscribe('REQUESTS');

app.get('/', (req, res) => {
    publishClient.publish('REQUESTS', `Request on ${req.socket.localPort} for ${req.url}`);
    console.log(`Local log for ${req.url}`);
    res.end();
});

app.listen(process.argv[2]);