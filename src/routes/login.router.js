require('dotenv').config()
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const loginRouter = require('express').Router();

loginRouter.post('/login', async (req, res) => {
    // validaciones
    

    // create token
    const token = jwt.sign({
        email: user.email,
        id: user._id
    }, SECRET_KEY)
    
    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })
})

module.exports = loginRouter;