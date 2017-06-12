const express = require('express'),
    config = require('../config.js'),
    process = require('process'),
    redis = require('redis');

const app = express();

const redisClient = redis.createClient(config.redisPort, config.redisHost);
// redisClient.set('REDIS_KEY', '0');

app.get('/', (req, res) => {
    redisClient.incr('REDIS_KEY');
    redisClient.get('REDIS_KEY', (err, reply) => {
        res.send(`
            <html>
                <head>
                    <title>Page</title>
                </head>
                <body>
                    <h1>Our Redis and Express Web Application</h1>
                    Redis count: ${reply}
                </body>
            </html>
        `)
    });
});

// app.listen(8080);
app.listen(process.argv[2]);
