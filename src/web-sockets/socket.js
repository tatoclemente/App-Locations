const { io } = require('../../index')

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  // client.emit('enviarMensajeServidor', {
  //     usuario: 'Administrador',
  //     mensaje: 'Bienvenido a esta aplicacion'
  // })
  socket.on('message', (message, roomName) => {
    console.log(message, roomName);
    io.emit('message', message)
    // io.emit('message', data)
    // client.to(idUser).emit('enviarMensajeServidor', {
    //     usuario: name,
    //     mensaje: message,
    // })
    // socket.emit('responseEvent', 'Hello Client')
  })
})