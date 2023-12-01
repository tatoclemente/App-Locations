const express = require('express')
const { 
  getPersonById, 
  getPersons, 
  createPerson, 
  updatePerson, 
  deletePerson 
} = require('../handlers/person')
const createPersonMiddleware = require('../handlers/person/createPersonMiddleware')

const personRouter = express.Router()

personRouter.get('/person/:id', getPersonById)

personRouter.get('/person', getPersons)

personRouter.put('/person/:id', updatePerson)

personRouter.delete('/person/:id', deletePerson)

personRouter.use('/person', createPersonMiddleware)

personRouter.post('/person', createPerson)


module.exports = personRouter