const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const baseUrl = 'https://api.darksky.net/forecast/'
    const apiKey = 'a03e413acde582f0e61b923f4564fe4e/'
    const url = baseUrl + apiKey + latitude + ',' + longitude + '?units=si'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        } else {
            const data = body
            const summary = data.daily.data[0].summary;
            const temperature = data.currently.temperature
            const precipitation = data.currently.precipProbability
            let forecastString = summary + ' Temperature is currently ' + temperature + 'C out. There is a ' + precipitation + '% chance of rain.'
            forecastString += ' Temperature High is ' + data.daily.data[0].temperatureHigh + 'C.'
            forecastString += ' Temperature low is ' + data.daily.data[0].temperatureLow + 'C'
            callback(undefined, forecastString)
        }
    })
}

module.exports = forecast