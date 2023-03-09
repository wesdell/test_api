const bcryptjs = require('bcryptjs')

const { checkGoogle } = require('../helpers/check_google')
const { createJWT } = require('../helpers/create_jwt')
const { User } = require('../models')

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    // check if the user does not exist
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ msg: 'The user does not exist.' })

    // check if the user was deleted -> state: false
    if (!user.state) {
      return res.status(404).json({ msg: 'The user does not exist.' })
    }

    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(404).json({ msg: 'Incorrect user password.' })
    }

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
    // check sign-in google with personal google_token_id, and take google user data
    const { name, email, img } = await checkGoogle(idToken)

    // check if user exists, if not we create it
    let user = await User.findOne({ email })
    if (!user) {
      const data = {
        name,
        email,
        img,
        password: name,
        google: true
      }
      user = new User(data)
      const salt = bcryptjs.genSaltSync()
      user.password = bcryptjs.hashSync(data.password, salt)
      await user.save()
    }

    // check if user was deleted -> state: false
    if (!user.state) {
      return res.status(401).json({ msg: 'User does not exist.' })
    }

    const token = await createJWT(user.id)

    res.status(200).json({ msg: 'Google Sing In ok', token })
  } catch (err) {
    console.log(err)
    res.status(400).json({ msg: 'Google Sign In failed.' })
  }
}

module.exports = {
  login,
  googleSignIn
}
