const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET_JWT

// creates a JWT using user id
const createJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid }
    const options = { expiresIn: '2h' }

    jwt.sign(payload, SECRET, options, (err, token) => {
      if (err) {
        console.log(err)
        reject(new Error('Cannot create your token.'))
      } else {
        resolve(token)
      }
    })
  })
}

module.exports = {
  createJWT
}
