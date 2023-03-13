const { check } = require('express-validator')

const { Router } = require('express')
const router = Router()

const { updateFile } = require('../controller/upload')
const { checkFields, checkFile } = require('../middleware')
const { checkCollection } = require('../helpers')

router
  // TEST API DEVELOPMENT
  // .get(
  //   '/:collection/:id',
  //   [
  //     check('collection').custom((c) =>
  //       checkCollection(c, ['users', 'products', 'hola'])
  //     ),
  //     check('id', 'It is not a valid id.').isMongoId(),
  //     checkFields
  //   ],
  //   showFile
  // )
  // TEST API DEVELOPMENT
  // .post('/', checkFile, loadFile)
  .put(
    '/:collection/:id',
    [
      checkFile,
      check('collection').custom((c) =>
        checkCollection(c, ['users', 'products'])
      ),
      check('id', 'It is not a valid id.').isMongoId(),
      checkFields
    ],
    updateFile
  )

module.exports = router
