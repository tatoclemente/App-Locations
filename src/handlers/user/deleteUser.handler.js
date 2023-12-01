const { User } = require('../../db')

const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findByPk(id)
    if (!user) return res.status(400).json({ error: "El usuario no existe" })
    await user.destroy()
    res.status(200).json({ message: "Usuario eliminado" })
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

module.exports = deleteUser