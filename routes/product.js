const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

const { checkCategory, checkProduct } = require('../helpers/check_database')
const { checkJWT, checkFields, checkAdminRole } = require('../middleware')
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controller/product')

router
  .get('/', getProducts)
  .get(
    '/:id',
    [
      check('id', 'It is not a valid id.').isMongoId(),
      check('id').custom(checkProduct),
      checkFields
    ],
    getProduct
  )
  .post(
    '/',
    [
      checkJWT,
      check('name', 'Product name is required.').not().isEmpty(),
      check('category', 'It is not a valid mongoid.').isMongoId(),
      check('category').custom(checkCategory),
      checkFields
    ],
    createProduct
  )
  .put(
    '/:id',
    [
      checkJWT,
      check('id', 'It is not a valid id.').isMongoId(),
      check('id').custom(checkProduct),
      check('category', 'You cannot change the category').not().exists(),
      checkFields
    ],
    updateProduct
  )
  .delete(
    '/:id',
    [
      checkJWT,
      checkAdminRole,
      check('id', 'It is not a valid id.').isMongoId(),
      check('id').custom(checkProduct),
      checkFields
    ],
    deleteProduct
  )

module.exports = router
