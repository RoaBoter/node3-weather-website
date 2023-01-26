const request = require('request')

const geoToken = 'pk.eyJ1IjoiaGVpbmVtIiwiYSI6ImNsMTlwbTFtaTFxZzEzZGthZW94ZjZsN3AifQ.zxFEVZ3oqdbm_zBLkr8WxQ'

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${geoToken}&limit=1&language=en`
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to geocode service!', undefined)
        } else if (body.error | body.features.length == 0) {
            callback('Unable to find location with geocode service! Try another location.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                cityName: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode