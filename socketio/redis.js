const config = require('../config.js'),
    redis = require('redis');

const client = redis.createClient(config.redisPort, config.redisHost);

const promiser = (resolve, reject) => {
    return (err, data) => {
        if(err) reject(err);
        resolve(data);
    }
};

const storeUser = (socketId, user) => {
    return new Promise((resolve, reject) => {
        client.setex(socketId, config.expire, user, promiser(resolve, reject));
    });
};

const getUser = (socketId) => {
    return new Promise((resolve, reject) => {
        client.get(socketId, promiser(resolve, reject));
        // TO test error behavior
        // client.get(socketId, 12345, promiser(resolve, reject));
    });
};

module.exports = {
    storeUser,
    getUser
}