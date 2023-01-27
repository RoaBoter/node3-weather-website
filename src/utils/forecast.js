const request = require('request')

const weatherToken = 'e862ab20690855a55d7c6ef3416d2357'

const getWeather = ( longitude, latitude, callback ) => {
    const url = `http://api.weatherstack.com/current?access_key=${weatherToken}&query=${longitude},${latitude}&units=m`
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location with weather service!', undefined)
        } else {
            callback(undefined, {
                temp: body.current.temperature,
                feelslike: body.current.feelslike,
                description: body.current.weather_descriptions[0],
                forecast: `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike}.`,
                icon: body.current.weather_icons[0]
            })
        }
    })
}

module.exports = getWeather