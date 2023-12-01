const { Person } = require('../../db')

const updatePerson = async (req, res) => {
  const { id } = req.params
  const { name, lastName, email, phone, address, geoCoding, profileImg, password } = req.body

  try {
    const person = await Person.findByPk(id)

    if (!person) res.status(400).json({ message: "La persona no existe" })

    if (name || lastName || phone || address || geoCoding || profileImg || password) {
      await person.update({ name, lastName, email, phone, address, geoCoding, profileImg, password })

      return res.status(200).json(person)
    }

  } catch (error) {
    return res.status(400).json(error.message)
  }
}

module.exports = updatePerson