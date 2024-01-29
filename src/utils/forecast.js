const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude +'&appid=e18af6297b9e4a89d51f7910f09bf346&units=metric';

    request({url, json : true}, (error, { body } = {}) => {
        if(error) {
            console.log('Unable to connect', undefined)
        } else {
            callback(undefined, body.weather[0].main + '. It is currently ' + body.main.temp + ' degrees out.'
            )
        }
    })
}

module.exports = forecast