require('dotenv').config()
const cors = require('cors')
import "core-js/stable"
import "regenerator-runtime/runtime"
import express from 'express'
import { mongoDBConnection }  from './db/config'
import survivorRoutes from './routes/survivor.routes'

const app = express()

import { json, urlencoded } from 'body-parser'

app.use(urlencoded({ extended: true }))
app.use(json())

// Connection to cloud db server
mongoDBConnection()

// Configure Routes
app.use('/survivor', survivorRoutes)


// Listening
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('listening on port', PORT)
})