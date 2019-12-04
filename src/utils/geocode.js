const request = require('request')

const geoCode = (address, callback) => {
    const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    const access_token = 'pk.eyJ1IjoidXRrYXJ6MTgiLCJhIjoiY2szbXM0a3lrMDRobTNwcWVuN2J2b2piMSJ9.NL3ztIw-PKcuuzQum_WSPw'
    const qyeryParams = '?access_token=' + access_token + '&limit=1'
    const url = baseUrl + encodeURIComponent(address) + '.json' + qyeryParams
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service', undefined)
        } else if (body.features.length < 1) {
            callback("Unable to find location. Try another search", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode