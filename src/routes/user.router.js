const express = require('express')
const { User } = require('../db')
const { Op } = require('sequelize')

const userRouter = express.Router()


// GET by ID
userRouter.get('/user/:id', async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findByPk(id)
    if (!user) return res.status(400).json({ error: "El usuario no existe" })
    res.status(200).json(user)
  } catch (error) {
    return res.status(400).json(error.message)
  }

})


// GET all Users or by name (with query)
userRouter.get('/user', async (req, res) => {
  const { name } = req.query

  try {
    if (!name) {
      const allUsers = await User.findAll()
  
      if (allUsers.length === 0) return res.status(400).json({ message: "No hay usuarios" })
      res.status(200).json(allUsers)
    } else {
      const usersByName = await User.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        }
      })
      console.log(usersByName);
      res.status(200).send(usersByName)
  
    }
  } catch (error) {
    res.status(400).json(error.message)
  }
})

// CREATE user whit email and password (required) , The route allows receiving first and last name
userRouter.post('/user', async (req, res) => {
  const { name, lastName, email, password } = req.body

  try {
    if (!email || !password) return res.status(400).json({message: 'Faltan datos'})


   const userData = { 
      name: name || null, 
      lastName: lastName || null,
      email, 
      password 
    }
    const [user, created] = await User.findOrCreate({ where: userData })

    if (created === false) res.status(400).json({ message: "El email ya existe" })
    if (created === true) res.status(201).json(user)

  } catch (error) {
    return res.status(400).json(error.message)
  }

})

userRouter.put('/user/:id', async (req, res) => {
  const { id } = req.params
  console.log(id);
  const { password, name, lastName, profileImg, role } = req.body
  console.log(role);

  try {
    const user = await User.findByPk(id)
    if (!user) return res.status(400).json({ error: "El usuario no existe" })

    else if (name || password || lastName || profileImg || role) {
      user.name = name ? name : user.email
      user.password = password ? password : user.password
      user.lastName = lastName ? lastName : user.lastName
      user.profileImg = profileImg ? profileImg : user.profileImg
      user.role = role ? role : user.role

      await user.save()
      res.status(200).json(user)
    } else return res.status(400).json({ error: "No has pasado ningun dato a modificar" })
  } catch (error) {
    return res.status(400).json(error.message)
  }

})


userRouter.delete('/user/:id', async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findByPk(id)
    if (!user) return res.status(400).json({ error: "El usuario no existe" })
    await user.destroy()
    res.status(200).json({ message: "Usuario eliminado" })
  } catch (error) {
    return res.status(400).json(error.message)
  }
})

module.exports = userRouter