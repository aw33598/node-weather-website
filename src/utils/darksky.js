const request = require('request');

const getWeather = (longitude, latitude, callback) => {

    const url_dark_sky = 'https://api.darksky.net/forecast/e882c5acbaf01257c8661d04ba0847ac/' + longitude + ',' + latitude + '?units=si';

    request({ url: url_dark_sky, json: true }, (err, { body }) => {
        if(err) {
            callback('Unable to connect to weather data', undefined);
        } else if(body.error) {
            callback('Unable to get the location', undefined);
        } else {
            const data = {
                temp: body.currently.temperature,
                chance: body.currently.precipProbability,
                timezone: body.timezone
            };
            callback(undefined, data);
        }
    });
};

module.exports = getWeather;