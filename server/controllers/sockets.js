exports.createSocket = (server) => {
  const io = require("socket.io")(server)
  io.on("connection", (socket) => {

    socket.on("joinRoom", (roomId) => {
      socket.join("room")
    })

    socket.on("insert", (insertOp) => {
      socket.to("room").emit("insert", insertOp)
    })

    socket.on("delete", (deleteOp) => {
      socket.to("room").emit(deleteOp)
    })

  })
}
