const express = require('express')

const userRouter = require('./user.router')
const personRouter = require('./person.router')
const sendRouter = require('./send.router')
const loginRouter = require('./login.router')
const { Message } = require('../db')

const router = express.Router()

router.use('/', userRouter)
router.use('/', personRouter)
router.use('/send', sendRouter)
router.use('/', loginRouter)
router.post('/message', async (req, res) => {
    try {
        const { roomId, user, msg, time } = req.body
        const saveMessage = await Message.create({
            roomId,
            username: user,
            msg,
            time,
        })
        res.status(200).json(saveMessage)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get('/message', async (req, res) => {
    try {
        const { roomId } = req.query
        const messages = await Message.findAll({
            where: {
                roomId,
            },
        })
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router
