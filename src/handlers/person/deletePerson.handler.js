const { Person } = require("../../db")

const deletePerson = async (req, res) => {
  const { id } = req.params
  try {
    const person = await Person.findByPk(id)
    if (!person) return res.status(400).json({ error: "La persona no existe" })
    await person.destroy()
    res.status(200).json({ message: "Persona eliminada" })
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

module.exports = deletePerson