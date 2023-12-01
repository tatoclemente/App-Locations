const { User } = require('../../db')
const { Op } = require('sequelize')

const getUsers = async (req, res) => {
  const { name } = req.query

  try {
    if (!name) {
      const allUsers = await User.findAll()

      if (allUsers.length === 0) return res.status(400).json({ message: "No hay usuarios" })
      res.status(200).json(allUsers)
    } else {
      const usersByName = await User.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        }
      })
      console.log(usersByName);
      res.status(200).send(usersByName)
    }
  } catch (error) {
    res.status(400).json(error.message)
  }
}

module.exports = getUsers