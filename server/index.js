const express = require('express')
const consola = require('consola')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream')
const {Nuxt, Builder} = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)

    const {host, port} = nuxt.options.server

    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    } else {
        await nuxt.ready()
    }

    // parse application/json
    app.use(bodyParser.json())

    // parse cookies
    app.use(cookieParser());

    // create a rotating write stream
    let accessLogStream = rfs('access.log', {
        interval: '1d', // rotate daily
        path: path.join(__dirname, 'log')
    })
    // setup the logger
    app.use(morgan('combined', {stream: accessLogStream}))

    app.get('/api', (req, res, next) => {
        res.json({message: "Api working"})
    })

    // Give nuxt middleware to express
    app.use(nuxt.render)

    // Listen the server
    app.listen(port, host)
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })
}

start()
