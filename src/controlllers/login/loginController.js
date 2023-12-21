require('dotenv').config()
const jwt = require('jsonwebtoken');
const { User } = require('../../db');

const { SECRET_KEY } = process.env;


const login = async (email, password) => {

  if (!email || !password) throw Error('Email and password required')

  const user = await User.findOne({ 
    where: { email }
   });

  if (!user) throw Error('User not found');
  if (user.password !== password) throw Error('Incorrect password');
  else {
    // create token
    const token = jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    }, SECRET_KEY)

    return {
      message: 'Logged in successfully',
      token
    }
  }
}

module.exports = login 