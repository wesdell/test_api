const { User, Role, Category, Product } = require('../models')

const checkRole = async (role) => {
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

const checkCategory = async (id) => {
  const categoryExist = await Category.findById(id)
  if (!categoryExist) {
    throw new Error('The category that you search does not exist.')
  }
}

const checkProduct = async (id) => {
  const productExist = await Product.findById(id)
  if (!productExist) {
    throw new Error('The product that you search does not exist.')
  }
}

module.exports = {
  checkRole,
  checkEmail,
  checkUser,
  checkCategory,
  checkProduct
}
