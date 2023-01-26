const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const getWeather = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Martin Heine'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Martin Heine'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'I cannot help you. I am just here to watch you fail.',
        name: 'Martin Heine'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, cityName: city} = {}) => {
        if (error) {
            return res.send({ error })
        } else {
            getWeather(longitude, latitude, (error, { forecast }) => {
                if (error) {
                    return res.send({ error })
                } else {
                    res.send({
                        forecast,
                        city,
                        address: req.query.address
                    })
                }
            })
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 - Helparticle not found',
        message: 'This helppage does not exist. If you need help try another page.',
        name: 'Martin Heine'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 - Page not found',
        message: 'The page you are looking for does not exist',
        name: 'Martin Heine'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})