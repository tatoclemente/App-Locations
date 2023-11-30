const express = require('express')

const userRouter = require('./user.router')
const personRouter = require('./person.router')

const router = express.Router()

router.use('/', userRouter)
router.use('/', personRouter)

module.exports = router
