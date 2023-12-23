const server = require('./src/app.js')
const { conn } = require('./src/db.js')
const { createServer } = require('node:http')
const { Server } = require('socket.io')

const { initializeApp, applicationDefault } = require('firebase-admin/app')

// const { getMessaging } = require('firebase-admin/messaging')

require('dotenv').config()

process.env.GOOGLE_APPLICATION_CREDENTIALS

initializeApp({
    credential: applicationDefault(),
    projectId: 'location--app'
})

require('dotenv').config()

let httpServer = createServer(server)

module.exports.io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    },
    connectionStateRecovery: {}
})
require('./src/web-sockets/socket')

const PORT = process.env.PORT | 3001

conn.sync({ alter: true })
.then(() => {
    httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    }) 
})
.catch(err => console.log(err.message))