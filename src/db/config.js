// Database connection
import mongoose from 'mongoose'

export const mongoDBConnection = () => {
  let mongoDB = process.env.MONGODB_URI
  mongoose.connect(mongoDB, 
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  )
  mongoose.Promise = global.Promise
  let db = mongoose.connection
  
  db.on('error', console.error.bind(console, 'Error connection with mongoDB '))
}