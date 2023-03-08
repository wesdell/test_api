const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

const { checkJWT, checkFields, checkAdminRole } = require('../middleware')
const { checkCategory } = require('../helpers/check_database')
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controller/category')

router
  .get('/', getCategories)
  .get(
    '/:id',
    [
      check('id', 'It is not a valid mongo id.').isMongoId(),
      check('id').custom(checkCategory),
      checkFields
    ],
    getCategory
  )
  .post(
    '/',
    [
      checkJWT,
      check('name', 'Category name is required.').not().isEmpty(),
      checkFields
    ],
    createCategory
  )
  .put(
    '/:id',
    [
      checkJWT,
      check('id', 'It is not a valid mongo id.').isMongoId(),
      check('id').custom(checkCategory),
      check('name', 'You only can update category name, and cannot be empty.')
        .not()
        .isEmpty(),
      checkFields
    ],
    updateCategory
  )
  .delete(
    '/:id',
    [
      checkJWT,
      check('id', 'It is not a valid mongo id.').isMongoId(),
      check('id').custom(checkCategory),
      checkAdminRole,
      checkFields
    ],
    deleteCategory
  )

module.exports = router
