const checkFields = require('./check_fields')
const checkJWT = require('./check_jwt')
const checkAdminRole = require('./check_role')
const checkFile = require('./check_file')

module.exports = {
  ...checkFields,
  ...checkJWT,
  ...checkAdminRole,
  ...checkFile
}
