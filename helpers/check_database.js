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

const checkCollection = (collection, validCollections) => {
  const collectionExist = validCollections.includes(collection)
  if (!collectionExist) {
    throw new Error('The collection that you search does not exist.')
  }
  return true
}

const searchDocInCollection = async (collection, id) => {
  let model
  switch (collection) {
    case 'users':
      model = await User.findById(id)
      break
    case 'products':
      model = await Product.findById(id)
      break
    default:
      throw new Error('Collection not provided, review on middleware.')
  }
  return model
}

module.exports = {
  checkRole,
  checkEmail,
  checkUser,
  checkCategory,
  checkProduct,
  checkCollection,
  searchDocInCollection
}
