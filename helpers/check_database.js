const Role = require('../models/Role')
const User = require('../models/User')

const checkRole = async (role = '') => {
  const roleExist = await Role.findOne({ role })
  if (!roleExist) {
    throw new Error('Role incorrect.')
  }
}

const checkEmail = async (email = '') => {
  const emailExist = await User.findOne({ email })
  if (emailExist) {
    throw new Error('This email already exists.')
  }
}

const checkUser = async (id) => {
  const userExist = await User.findById(id)
  if (!userExist) {
    throw new Error('User does not exist.')
  }
}

module.exports = {
  checkRole,
  checkEmail,
  checkUser
}
