const express = require('express')
const authenticateToken = require('../authMiddleware')
const { getUsers, getUserById, updateUser, deleteUser, createUser } = require('../handlers/user')

const userRouter = express.Router()

userRouter.post('/user', (req, res) => {
    console.log(req.body);
    res.status(200).json()
})

// GET by ID
userRouter.get('/user/:id', getUserById)

// GET all Users or by name (with query)
userRouter.get('/user', getUsers)

// CREATE user whit email and password (required) , The route allows receiving first and last name
// required name, lastname, email, password
userRouter.post('/user', createUser)



// UPDATE user / props --> name, lastName, password, role, profileImg
userRouter.put('/user/:id', updateUser)

// DELETE user
userRouter.delete('/user/:id', deleteUser)

module.exports = userRouter