const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/647289b14e21a6b5151fd688abb8462e/' + lat + ',' + long + '?units=uk2'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)

        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature.toFixed()+ ' degrees out. The high today is ' + body.daily.data[0].temperatureHigh.toFixed() + ' with a low of ' + body.daily.data[0].temperatureLow.toFixed() + '. There is a ' + body.currently.precipProbability + '% chance of rain.')     
        }   
    })
}


module.exports = forecast


// To grab body property from the response object (which is being passed as the function argument) we
// are using the Destructuring function Arguments pattern



