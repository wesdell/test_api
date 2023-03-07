require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')

const morgan = require('morgan')

const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')

const PORT = process.env.PORT

app
  // app config
  .set('port', PORT)
  // middleware
  .use(morgan('dev'))

  .use(cors())
  .use(express.json())
  // middleware routing
  .use('/', express.static('public'))
  .use('/api/users', userRoutes)
  .use('/api/auth', authRoutes)
  .use('*', (req, res) => {
    res.status(404).json({ message: 'This road does not exist.' })
  })

app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`)
})
