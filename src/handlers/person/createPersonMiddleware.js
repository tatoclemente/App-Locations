const { Person } = require("../../db");

const createPersonMiddleware = async (req, res, next) => {
  const { name, lastName, phone, address, geoCoding, ...rest } = req.body;

  // Validar datos
  if (!name || !lastName || !phone || !address || !geoCoding) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  // Crear persona
  const person = await Person.create({
    name,
    lastName,
    phone,
    address,
    geoCoding,
    ...rest,
  });

  // Almacenar ID persona en variable local
  res.locals.personId = person.id;

  next();
};

module.exports = createPersonMiddleware;