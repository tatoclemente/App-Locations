const express = require('express')

const userRouter = require('./user.router')
const personRouter = require('./person.router')
const sendRouter = require('./send.router')

const router = express.Router()

router.use('/', userRouter)
router.use('/', personRouter)
router.use('/send', sendRouter)

module.exports = router
