const config = require('../config.js'),
    redis = require('redis');

const client = redis.createClient(config.redisPort, config.redisHost);

const promiser = (resolve, reject) => {
    return (err, data) => {
        if(err) reject(err);
        resolve(data);
    }
}

const aroundLoc = (long, lat, miles) => {
    return new Promise((resolve, reject) => {
        client.georadius('places', long, lat, miles, 'mi', 'WITHDIST', promiser(resolve, reject));
    });
};

const aroundSB = (miles) => {
    return new Promise((resolve, reject) => {
        client.georadiusbymember('places', 'South Bend', miles, 'mi', 'WITHDIST', promiser(resolve, reject));
    });
};

module.exports = {
    client,
    aroundSB,
    aroundLoc
}