const mongoose = require('mongoose')

const ENDPOINT = process.env.MONGODB_CONNECTION_STRING

mongoose
  .connect(ENDPOINT)
  .then(() => {
    console.log('Connected')
  })
  .catch((err) => {
    console.log(err)
  })
