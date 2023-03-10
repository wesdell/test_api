const checkFile = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({ msg: 'Any file to upload.' })
  }
  next()
}

module.exports = {
  checkFile
}
