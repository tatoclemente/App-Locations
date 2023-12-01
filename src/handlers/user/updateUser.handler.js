const { User } = require('../../db')

const updateUser = async (req, res) => {
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

}

module.exports = updateUser