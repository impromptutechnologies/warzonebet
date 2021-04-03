const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8242c34e3acd12b06cf784f0181c6667&query=' + latitude + ',' + longitude + ''
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (body.length === 0) {
            callback('No Place', undefined)
        } else{
            callback(undefined, {
                temperature: body.current.temperature
            })
        }
    })

}


module.exports = forecast
