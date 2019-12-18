import React, { useEffect } from "react"
import { Flex } from "rebass"
import Editor from "./components/editor"
import socket from "./socket/socket.js"


const App = () => {

  useEffect(() => {
    socket().joinRoom("room")
  })

  return (
    <Flex>
      <Editor/>
    </Flex>
  )
}

export default App;
