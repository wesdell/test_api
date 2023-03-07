const bcryptjs = require('bcryptjs')

const { checkGoogle } = require('../helpers/check_google')
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

const googleSignIn = async (req, res) => {
  const { idToken } = req.body
  try {
    const { name, email, img } = await checkGoogle(idToken)

    // check if user exists, if not we create it
    let user = await User.findOne({ email })
    if (!user) {
      const data = {
        name,
        email,
        img,
        password: '.',
        google: true
      }
      user = new User(data)
      await user.save()
    }

    if (!user.state) return res.status(401).json({ msg: 'User does not exist.' })

    res.status(200).json({ msg: 'Google Sing In ok' })
  } catch (err) {
    console.log(err)
    res.status(400).json({ msg: 'Google Sign In failed.' })
  }
}

module.exports = {
  login,
  googleSignIn
}
