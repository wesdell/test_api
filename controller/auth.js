const bcryptjs = require('bcryptjs')

const { createJWT } = require('../helpers/create_jwt')
const User = require('../models/User')

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) return res.status(404).json({ msg: 'The user does not exist.' })

    if (!user.state) return res.status(404).json({ msg: 'The user does not exist.' })

    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) return res.status(404).json({ msg: 'Incorrect user password.' })

    const token = await createJWT(user.id)

    res.status(200).json({ user, token })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Something was wrong.' })
  }
}

module.exports = {
  login
}
