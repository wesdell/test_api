const { check } = require('express-validator')

const { Router } = require('express')
const router = Router()

const { login } = require('../controller/auth')
const { checkFields } = require('../middleware/check_fields')

router
  .post(
    '/login',
    [
      check('email', 'Email is required').isEmail(),
      check('password', 'Password is required').not().isEmpty(),
      checkFields],
    login
  )

module.exports = router
