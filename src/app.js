const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirPath = path.join(__dirname,'../public')
const viewsDirPath = path.join(__dirname,'../templates/views')
const partialsDirPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        author: 'Lekhashree'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Me',
        author: 'Lekhashree'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help',
        author: 'Lekhashree'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address for weather forecast'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
        if(error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })            
            }
            res.send({
                address : req.query.address,
                forecast : forecastData,
                location : place
            })
        }) 
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: 'Error!',
        author: 'Lekhashree',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        title: 'Error!',
        author: 'Lekhashree',
        error: '404 Not Found'})
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})