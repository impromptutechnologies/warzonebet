const { dir } = require('console')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const dirname = __dirname

const app = express()
//Define paths for express config
const publicdirectory = path.join(dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')
const partialsPath = path.join(__dirname, '../templates/partials')

//handle and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//set up static directory
app.use(express.static(publicdirectory))

app.get('/wet', (req, res) => {
    res.render('wet', {
        title: 'WOWZERS BOT',
        creator: 'Jongbin Won'
    })
})


app.get('', (req, res) => {
    res.render('index', {
        title: 'NIGGEER BOT',
        creator: 'Jongbin Won'
    })
})
// fag.com
// fag.com/wet
// fag.com/ass
// fag.com/pussy

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'IDIOT!!!',
        message: 'YOU ARE TRYNA LOOK FOR HELP BUT FAILED'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'query address...'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, name = "ggs" } = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, { temperature }) => {
            if (error){
                return res.send({error})
            }
            res.send({
                weather:[{
                    address:req.query.address,
                    temperature:temperature
                }]
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'NO WORDS....',
        message: 'HOPELESSLY LOST'
    })
})


app.listen(6969, () => {
    console.log('server running port 3000')
})