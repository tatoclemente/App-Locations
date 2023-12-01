const { Person } = require('../../db')

const getPersonById = async (req, res) => {
  const { id } = req.params
  try {
    
    const person = await Person.findByPk(id)
    if (!person) res.status(400).json({ message: "La persona no existe" })
    else res.status(200).json(person)
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

module.exports = getPersonById