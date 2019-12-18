import io from "socket.io-client"
const socket = io("http://localhost:4000")

export default function() {

  const joinRoom = (roomId) => {
    socket.emit("joinRoom", roomId)
  }

  const emitInsert = (insertOp) => {
    socket.emit("insert", insertOp)
  }

  const emitDelete = (deleteOp) => {
    socket.emit("delete", deleteOp)
  }

  const handleInsert = (handler) => {
    socket.on("insert", handler)
  }

  const handleDelete = (handler) => {
    socket.on("delete", handler)
  }

  return {
    joinRoom,
    emitInsert,
    emitDelete,
    handleInsert,
    handleDelete,
  }
}
