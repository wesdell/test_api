const { check } = require('express-validator')

const { Router } = require('express')
const router = Router()

const { showFile, loadFile, updateFile } = require('../controller/upload')
const { checkFields, checkFile } = require('../middleware')
const { checkCollection } = require('../helpers')

router
  .get(
    '/:collection/:id',
    [
      check('collection').custom((c) =>
        checkCollection(c, ['users', 'products', 'hola'])
      ),
      check('id', 'It is not a valid id.').isMongoId(),
      checkFields
    ],
    showFile
  )
  .post('/', checkFile, loadFile)
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
