const { Person, User } = require('../../db')
const createPerson = async (req, res) => {
  const personId = res.locals.personId;
  const { userId } = req.body;
  console.log(userId);
  try {
    // Asignar persona al usuario
    await Person.update({
      userId,
    }, {
      where: {
        id: personId,
      },
    });

    // Enviar respuesta
    res.status(200).json({
      message: 'La persona se ha asignado correctamente',
    });
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

module.exports = createPerson