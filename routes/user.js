const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

const { checkFields, checkJWT, checkAdminRole } = require('../middleware')

const { getUser, postUser, putUser, deleteUser } = require('../controller/user')
const { checkRole, checkEmail, checkUser } = require('../helpers/check_database')

router
  .get(
    '/',
    [
      checkFields
    ],
    getUser
  )
  .post(
    '/',
    [
      check('name', 'Name is required.').not().isEmpty(),
      check('email', 'Insert a valid email.').isEmail(),
      check('email').custom(checkEmail),
      check(
        'password',
        'Password length must be minimum 6 characters.'
      ).isLength({ min: 6 }),
      check('role').custom(checkRole),
      checkFields
    ],
    postUser
  )
  .put(
    '/:id',
    [
      check('id', 'Incorrect id.').isMongoId(),
      check('id').custom(checkUser),
      check('role').custom(checkRole),
      checkFields
    ],
    putUser
  )
  .delete(
    '/:id',
    [
      checkJWT,
      checkAdminRole,
      check('id', 'Incorrect id.').isMongoId(),
      check('id').custom(checkUser),
      checkFields
    ],
    deleteUser
  )

module.exports = router
