const { Person } = require('../../db')

const getPersons = async (req, res) => {
  const { query, type } = req.query

  switch (type) {
    case 'name':
      const personsByName = await Person.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        }
      })

      res.status(200).send(personsByName)
      break;

    case 'address':
      const personsByAddress = await Person.findAll({
        where: {
          name: {
            [Op.iLike]: `%${query}%`
          }
        }
      })

      res.status(200).send(personsByAddress)
      break;

    default:
      const allPersons = await Person.findAll()

      if (allPersons.length === 0) res.status(400).json({ message: "No hay usuarios" })
      else res.status(200).json(allPersons)

      break;

  }
}

module.exports = getPersons