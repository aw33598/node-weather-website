const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode');
const forecast = require('./utils/darksky');

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abdul Wahab'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abdul Wahab'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Abdul Wahab'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a location to fetch the address'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, placeName } = {}) => {
        if(error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, { temp, chance, timezone }) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                placeName,
                temp,
                chance,
                timezone
            })
        });
    });
    

    // console.log(req.query.address);
    // res.send({
    //     forecast: 'It is raining',
    //     address: req.query.address
    // })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abdul Wahab',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abdul Wahab',
        errorMessage: 'Page not found.'
    })
})

app.listen(5000, () => {
    console.log('Server is up on port 5000.')
})