import '@babel/polyfill/noConflict'
import './middlewares/database'
import registerRoutes from './middlewares/register-routes'

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import http from 'http'

const app = express()
const server = http.createServer(app)

app.use(
    cors({
        origin: '*',
    })
)

app.use(bodyParser.json())
registerRoutes(app)

const SERVER_PORT = process.env.PORT || 5000
server.listen(SERVER_PORT, function() {
    console.log(`LISTENING ON PORT ${SERVER_PORT}!`)
})
