const express = require('express')
const { Person } = require('../db')
const personRouter = express.Router()

personRouter.get('/person', async (req, res) => {
    const { name } = req.query
  console.log("NAME: ", name);
    if (!name) {
      const allPersons = await Person.findAll()
  
      if (allPersons.length === 0) return res.status(400).json({ message: "No hay usuarios" })
      res.status(200).json(allPersons)
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
      if (!name || !lastName || !phone || !address) return res.status(400).json({message: 'Faltan datos'})
  
  
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

  module.exports = personRouter