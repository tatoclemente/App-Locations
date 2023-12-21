const { io } = require('../../index')

io.on('connection', (client) => {
  console.log('Usuario conectado');

  client.emit('enviarMensajeServidor', {
      usuario: 'Administrador',
      mensaje: 'Bienvenido a esta aplicacion'
  })
  client.on('enviarMensajeCliente', (data, callback) => {
    console.log(data);
    const { idUser, name, message } = data
    client.to(idUser).emit('enviarMensajeServidor', {
        usuario: name,
        mensaje: message,
    })
    // socket.emit('responseEvent', 'Hello Client')
    callback({
        status: 'OK'
    })
  })
})