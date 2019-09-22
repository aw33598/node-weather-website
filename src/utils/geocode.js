const request = require('request');

const geoCode = (address, callback) => {
    const url_mapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'      + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXczMzU5OCIsImEiOiJjazBzMnd2OHYwY3I0M21vN3Nkcm1wYTlxIn0.di_4SSvp87u8wPXl5mXnAA&limit=1';

    request({ url: url_mapbox, json: true }, (err, { body }) => {
        if(err) {
            callback('Unable to connect to location services', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to get the location. Please try again.', undefined);
        } else {
            const data = {
                placeName: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            };
            callback(undefined, data);
        }
    });
};

module.exports = geoCode;