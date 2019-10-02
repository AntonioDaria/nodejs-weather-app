const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define path for express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//to customize the server - set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Antonio D'aria" 
   })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About ...',
        name: "Antonio D'aria" 
   })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Helpful text',
        title: 'Help',
        name: "Antonio D'aria" 
   })
})

app.get('/weather', (req, res) => {
    //render json (use.send to send  a json obj back)
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                }
                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                })
                
            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []  
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Antonio D'aria",
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Antonio D'aria",
        errorMessage: 'Page not found.'
    })
 })

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})