const getPersonById = require('./getPersonById.handler')
const getPersons = require('./getPersons.handler')
const createPerson = require('./createPerson.handler')
const updatePerson = require('./updatePerson.handler')
const deletePerson = require('./deletePerson.handler')

module.exports = {
    getPersonById,
    getPersons,
    createPerson,
    updatePerson,
    deletePerson,
}