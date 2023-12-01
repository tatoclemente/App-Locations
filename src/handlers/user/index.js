const getUsers = require('./getUsers.handler')
const getUserById = require('./getUserById.handler')
const updateUser = require('./updateUser.handler')
const deleteUser = require('./deleteUser.handler')
const createUser = require('./createUser.handler')

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    createUser
}