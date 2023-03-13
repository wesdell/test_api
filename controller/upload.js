// TEST API DEVELOPMENT
// const path = require('path')
// const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

// TEST API DEVELOPMENT
// const { uploadFile } = require('../helpers')

const { searchDocInCollection } = require('../helpers')

// TEST API DEVELOPMENT
// send the file as the response
// const showFile = async (req, res) => {
//   const { collection, id } = req.params
//   try {
//     // checks in whick collection is the doc
//     const model = await searchDocInCollection(collection, id)

//     if (!model) {
//       return res
//         .status(400)
//         .json({ msg: `Not exist ${collection} with id: ${id}` })
//     }

//     // if the collection has an image, send it
//     if (model.img) {
//       const pathFile = path.join(__dirname, '../uploads', collection, model.img)
//       if (fs.existsSync(pathFile)) {
//         return res.status(200).sendFile(pathFile)
//       }
//     }

//     // if the collection has NOT an image, put this by default
//     const defaultPath = path.join(__dirname, '../assets/no-image.jpg')
//     res.status(200).sendFile(defaultPath)
//   } catch (err) {
//     console.log(err)
//     res.status(400).json({ msg: 'Something was wrong' })
//   }
// }

// TEST API DEVELOPMENT
// const loadFile = async (req, res) => {
//   try {
//     const fileName = await uploadFile(
//       req.files,
//       ['png', 'jpg', 'jpge', 'gif'],
//       'images'
//     )
//     res.status(200).json({ fileName })
//   } catch (err) {
//     res.status(400).json({ msg: err })
//   }
// }

// TEST API DEVELOPMENT - ONLY CAN BE ACTIVE ONE
// const updateFile = async (req, res) => {
//   const { collection, id } = req.params
//   try {
//     const model = await searchDocInCollection(collection, id)

//     if (!model) {
//       return res
//         .status(400)
//         .json({ msg: `Not exist ${collection} with id: ${id}` })
//     }

//     // delete previous images
//     if (model.img) {
//       const pathFile = path.join(__dirname, '../uploads', collection, model.img)
//       if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile)
//     }

//     // save image on local folder
//     const newFile = await uploadFile(
//       req.files,
//       ['png', 'jpg', 'jpge', 'gif'],
//       collection
//     )
//     model.img = newFile

//     await model.save()
//     res.status(200).json(model)
//   } catch (err) {
//     console.log(err)
//     res.status(400).json({ msg: 'Something was wrong' })
//   }
// }

// TEST API PRODUCTION - ONLY CAN BE ACTIVE ONE
const updateFile = async (req, res) => {
  const { collection, id } = req.params
  try {
    // checks in whick collection is the doc
    const model = await searchDocInCollection(collection, id)

    if (!model) {
      return res
        .status(400)
        .json({ msg: `Not exist ${collection} with id: ${id}` })
    }

    // delete previous images
    if (model.img) {
      const filePath = model.img.split('/')
      const fileName = filePath[filePath.length - 1]
      const [publicId] = fileName.split('.')
      cloudinary.uploader.destroy(publicId)
    }

    // sends the new image to cloudinary
    const { tempFilePath } = req.files.file
    const { secure_url: secureUrl } = await cloudinary.uploader.upload(
      tempFilePath
    )

    // save image on database
    model.img = secureUrl
    await model.save()

    res.status(200).json(model)
  } catch (err) {
    console.log(err)
    res.status(400).json({ msg: 'Something was wrong' })
  }
}

module.exports = { updateFile }
