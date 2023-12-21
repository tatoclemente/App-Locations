const loginHandler = require('../handlers/login/login.handler');


const loginRouter = require('express').Router();

loginRouter.post('/login', loginHandler)

module.exports = loginRouter;