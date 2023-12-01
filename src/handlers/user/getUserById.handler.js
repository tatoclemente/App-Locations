const { User } = require('../../db')

const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findByPk(id)
    if (!user) return res.status(400).json({ error: "El usuario no existe" })
    res.status(200).json(user)
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

module.exports = getUserById