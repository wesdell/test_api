const jwt = require('jsonwebtoken')

const User = require('../models/User')

const SECRET = process.env.SECRET_JWT

const checkJWT = async (req, res, next) => {
  // const token = req.headers['key-token-jwt']
  const token = req.get('key-token-jwt')

  if (!token) return res.status(401).json({ msg: 'Unexpected token.' })

  try {
    const { uid } = jwt.verify(token, SECRET)
    const user = await User.findById(uid)

    if (!user) return res.status(401).json({ msg: 'User does not exist on database.' })

    if (!user.state) return res.status(401).json({ msg: 'User is not active.' })

    req.userAuth = user
    next()
  } catch (err) {
    console.log(err)
    res.status(401).json({ msg: 'Unexpected token.' })
  }
}

module.exports = {
  checkJWT
}
