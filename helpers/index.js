const checkDataBase = require('./check_database')
const checkGoogle = require('./check_google')
const createJWT = require('./create_jwt')
const uploadFile = require('./upload_file')

module.exports = {
  ...checkDataBase,
  ...checkGoogle,
  ...createJWT,
  ...uploadFile
}
