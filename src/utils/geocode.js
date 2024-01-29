const request = require('request')

const geocode = (address, callback) => {

    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibGVraGFzaHJlZXAiLCJhIjoiY2t3d2RjcWRyMDJsajMwcm50bXN4OTlwMiJ9.LA0PK6yVH0elUrweLUfPMw';

    request({url : geocodeUrl, json : true}, (error, { body } = {}) => {
        if(error) {
            console.log('Unable to connect', undefined)
        } else {
            callback(undefined, {
                place:  body.features[0].place_name, 
                latitude: body.features[0].center[1], 
                longitude: body.features[0].center[0], 
            })
        }
    })

}

module.exports = geocode