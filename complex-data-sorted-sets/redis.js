const config = require('../config.js'),
    redis = require('redis');

const client = redis.createClient(config.redisPort, config.redisHost);

const promiser = (resolve, reject) => {
    return (err, data) => {
        if(err) reject(err);
        resolve(data);
    }
}

const get = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, promiser(resolve, reject));
    });
};

const hgetall = (key) => {
    return new Promise((resolve, reject) => {
        if(key === null) reject();
        client.hgetall(key, promiser(resolve, reject));
    });
};

const lrange = (key) => {
    return new Promise((resolve, reject) => {
        client.lrange(key, [0, -1], promiser(resolve, reject));
    });
};

const zrevrangebyscore = (key,  max, min) => {
    return new Promise((resolve, reject) => {
        client.zrevrangebyscore(key, max, min, promiser(resolve, reject));
    });
};

module.exports = {
    get,
    hgetall,
    lrange,
    client,
    zrevrangebyscore
}