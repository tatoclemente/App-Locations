const { io } = require('../../index');
const { Message } = require('../db');

// Define la función last() como método estático
const getLastMsg = async () => {
  return await Message.findOne({
    order: [[ 'createdAt', 'DESC']]
  });
};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`user with id-${socket.id} joined room - ${roomId}`);
  });

  socket.on('send_msg', async (data) => {
    // console.log(data, 'DATA');

    await Message.create(data)

    const lastMsgDB = await getLastMsg()

    console.log("ULTIMO MENSAJE", lastMsgDB);

    socket.to(data.roomId).emit('receive_msg', data, lastMsgDB.id)

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  })
})