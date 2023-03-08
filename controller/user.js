require('../models/connection')
const bcryptjs = require('bcryptjs')

const { User } = require('../models')

const getUser = async (req, res) => {
  const { prev = 0, next = 5 } = req.query

  const query = { state: true }
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(prev)).limit(Number(next))
  ])

  res.status(200).json({ total, users })
}

const postUser = async (req, res) => {
  const { name, email, password, role } = req.body
  const user = new User({ name, email, password, role })

  // Encrypts user password
  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password, salt)

  // Saves user data in database
  user.save()

  res.status(201).json({ user })
}

const putUser = async (req, res) => {
  const { id } = req.params
  const { _id, password, google, email, ...rest } = req.body

  if (password) {
    // Encrypts user password
    const salt = bcryptjs.genSaltSync()
    rest.password = bcryptjs.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate(id, rest)

  res.status(200).json({ user })
}

const deleteUser = async (req, res) => {
  const { id } = req.params

  await User.findByIdAndUpdate(id, { state: false })

  res.status(202).json({ msg: 'Deleted' })
}

module.exports = {
  getUser,
  postUser,
  putUser,
  deleteUser
}
