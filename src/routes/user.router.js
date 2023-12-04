const express = require('express')
const authenticateToken = require('../authMiddleware')
const { getUsers, getUserById, updateUser, deleteUser, createUser } = require('../handlers/user')
// const webpush = require('../webpush')
const userRouter = express.Router()

// let pushSuscription;

// userRouter.post('/user', async (req, res) => {
//     pushSuscription = req.body;
//     res.status(200).json()

//     const payload = JSON.stringify({
//         title: 'My custom Notification',
//         message: 'Helo world'
//     })
//     try {
//         await webpush.sendNotification(pushSuscription, payload)
//     } catch (error) {
//         console.error(error);
//     }
// })

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