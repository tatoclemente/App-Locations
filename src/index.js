const server = require('./app')
const { conn } = require('./db.js')
require('dotenv').config()

const PORT = process.env.PORT | 3000

conn.sync({ force: false })
.then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    }) 
})
.catch(err => console.log(err.message))