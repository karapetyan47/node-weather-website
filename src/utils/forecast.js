const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=d1551388021a5dc1d99f7fab342e100e&query=' +
    latitude +
    ',' +
    longitude +
    '&units=f';
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          '||' +
          body.current.temperature +
          '||' +
          body.current.feelslike,
      );
    }
  });
};

module.exports = forecast;
