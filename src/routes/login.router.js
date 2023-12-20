require('dotenv').config()
const jwt = require('jsonwebtoken');
const { User } = require('../db');

const { SECRET_KEY } = process.env;

const loginRouter = require('express').Router();

loginRouter.post('/login', async (req, res) => {
    // validaciones
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });
    if (user.password !== password) return res.status(400).json({ error: 'Incorrect password' });
    else {
        
    // create token
    const token = jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
    }, SECRET_KEY)

    res.cookie('auth-token', token, { httpOnly: true, secure:true })
    res.status(200).json({
        message: 'Logged in successfully',
    })
    
    }

    // res.header('auth-token', token).json({
    //     error: null,
    //     data: {token}
    // })
})

module.exports = loginRouter;