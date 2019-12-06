import '@babel/polyfill/noConflict'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import registerRoutes from './middlewares/register-routes'
import './middlewares/database'

class AppController {
    constructor() {
        this.express = express()

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.express.use(
            cors({
                origin: '*',
            })
        )

        this.express.use(bodyParser.json())
    }

    routes() {
        registerRoutes(this.express)
    }
}

export default new AppController().express
