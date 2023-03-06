const checkFields = require('./check_fields')
const checkJWT = require('./check_jwt')
const checkAdminRole = require('./check_role')

module.exports = {
  ...checkFields,
  ...checkJWT,
  ...checkAdminRole
}
