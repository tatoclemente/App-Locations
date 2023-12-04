const server = require('./src/app.js')
const { conn } = require('./src/db.js')

const { initializeApp, applicationDefault } = require('firebase-admin/app')

const { getMessaging } = require('firebase-admin/messaging')

require('dotenv').config()

process.env.GOOGLE_APPLICATION_CREDENTIALS

initializeApp({
    credential: applicationDefault(),
    projectId: 'location--app'
})

require('dotenv').config()

const PORT = process.env.PORT | 3001

conn.sync({ alter: true })
.then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    }) 
})
.catch(err => console.log(err.message))