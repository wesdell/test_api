require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')

const ROUTES = {
  auth: './routes/auth',
  category: './routes/category',
  product: './routes/product',
  upload: './routes/upload',
  user: './routes/user'
}

const PORT = process.env.PORT

app
  // app config
  .set('port', PORT)

  // middleware
  .use(morgan('dev'))
  .use(cors())
  .use(express.json())
  .use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    })
  )

  // middleware routing
  .use('/', express.static('public'))
  .use('/api/auth', require(ROUTES.auth))
  .use('/api/categories', require(ROUTES.category))
  .use('/api/products', require(ROUTES.product))
  .use('/api/upload', require(ROUTES.upload))
  .use('/api/users', require(ROUTES.user))
  .use('*', (req, res) => {
    res.status(404).json({ message: 'This road does not exist.' })
  })

app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`)
})
