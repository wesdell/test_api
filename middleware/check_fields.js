const { validationResult } = require('express-validator')

// check if all the previous validations in the router do not throw an error
const checkFields = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }

  next()
}

module.exports = {
  checkFields
}
