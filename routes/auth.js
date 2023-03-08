const { check } = require('express-validator')

const { Router } = require('express')
const router = Router()

const { login, googleSignIn } = require('../controller/auth')
const { checkFields } = require('../middleware/check_fields')

router
  .post(
    '/login',
    [
      check('email', 'Email is required').isEmail(),
      check('password', 'Password is required').not().isEmpty(),
      checkFields
    ],
    login
  )
  .post(
    '/google',
    [check('idToken', 'idToken is required').not().isEmpty(), checkFields],
    googleSignIn
  )

module.exports = router
