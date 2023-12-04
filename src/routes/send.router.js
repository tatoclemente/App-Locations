const express = require('express')

const { getMessaging } = require('firebase-admin/messaging')

const sendRouter = express.Router()

sendRouter.post('/', (req, res) => {
    const recibedToken = req.body.fmcToken
    const message = {
        notification: {
          title: 'Notify',
          body: 'This is a Test Nootification'
        },
        token: recibedToken
      };

      getMessaging()
      .send(message)
      .then((response) => {
        res.status(200).json({
            message: 'Notification sent successfully',
            token: recibedToken,
        })
        console.log('Successfully sent message: ', response);
      })
      .catch((error) => {
        res.status(400)
        res.send(error.message)
        console.log("Eroor sending: ", error.message);
      })

})

module.exports = sendRouter