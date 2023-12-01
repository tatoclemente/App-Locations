require('dotenv').config()
const { User } = require('../../db')
const jwt = require('jsonwebtoken')

const { SECRET_KEY } = process.env

const createUser = async (req, res) => {
  const { name, lastName, email, password } = req.body

  try {
    if (!email || !password) return res.status(400).json({ message: 'Faltan datos' })


    const userData = {
      name: name || null,
      lastName: lastName || null,
      email,
      password
    }
    const [user, created] = await User.findOrCreate({ where: userData })

    if (created === false) res.status(400).json({ message: "El email ya existe" })
    if (created === true) {

      const payload = {
        id: user.id,
        role: user.role,
      }
      const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: '30d',
      })

      res.status(201).json({ user, token })
    }

  } catch (error) {
    return res.status(400).json(error.message)
  }

}

module.exports = createUser;