const express = require('express')
const { Person } = require('../db')
const personRouter = express.Router()


personRouter.get('/person/:id', async (req, res) => {
  const { id } = req.params
  try {
    const person = await Person.findByPk(id)
    if (!person) res.status(400).json({ message: "La persona no existe" })
    else res.status(200).json(person)
  } catch (error) {
    return res.status(400).json(error.message)
  }
})

personRouter.get('/person', async (req, res) => {
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
})


personRouter.post('/person', async (req, res) => {
  const { name, lastName, email, phone, address } = req.body

  try {
    if (!name || !lastName || !phone || !address) res.status(400).json({ message: 'Faltan datos' })


    const userData = {
      name,
      lastName,
      email: email || null,
      phone,
      address,
    }
    const [person, created] = await Person.findOrCreate({ where: userData })

    if (created === false) res.status(400).json({ message: "La persona ya existe" })
    if (created === true) res.status(201).json(person)

  } catch (error) {
    return res.status(400).json(error.message)
  }

})

personRouter.put('/person/:id', async (req, res) => {
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
})

personRouter.delete('/person/:id', async (req, res) => {
  const { id } = req.params
  try {
    const person = await Person.findByPk(id)
    if (!person) return res.status(400).json({ error: "La persona no existe" })
    await person.destroy()
    res.status(200).json({ message: "Persona eliminada" })
  } catch (error) {
    return res.status(400).json(error.message)
  }
})

module.exports = personRouter