const path = require('path')

const { v4: uuidv4 } = require('uuid')

const uploadFile = (files, validExtensions, folder = '') => {
  return new Promise((resolve, reject) => {
    const { file } = files
    const newFileName = file.name.split('.')
    const extension = newFileName[newFileName.length - 1]

    // verify extension
    if (!validExtensions.includes(extension)) {
      return reject(
        new Error(`Only files with extension: ${validExtensions} are allowed.`)
      )
    }

    // assign new name at file
    const tempName = `${uuidv4()}.${extension}`
    const uploadPath = path.join(__dirname, '../uploads', folder, tempName)

    // move file to another private folder
    file.mv(uploadPath, (err) => {
      if (err) return reject(err)

      resolve(tempName)
    })
  })
}

module.exports = { uploadFile }
