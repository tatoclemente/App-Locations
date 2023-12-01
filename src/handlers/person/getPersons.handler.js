const { Person } = require('../../db')

const getPersons = async (req, res) => {
  const { name } = req.query

  if (!name) {
    const allPersons = await Person.findAll()

    if (allPersons.length === 0) res.status(400).json({ message: "No hay usuarios" })
    else res.status(200).json(allPersons)

  } else {
    const personsByName = await Person.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    })

    res.status(200).send(personsByName)

  }
}

module.exports = getPersons