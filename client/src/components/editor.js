import React, { useState } from "react"
import AceEditor from "react-ace"
import socket from "../socket/socket.js"

const Editor = () => {
  const [snippet, updateSnippet] = useState("Hello World!")
  const serverSocket = socket()

  const onChange = (newVal, event) => {
    updateSnippet(newVal)
    serverSocket.emitInsert(newVal)
  }

  serverSocket.handleInsert((insertOp) => {
    updateSnippet(insertOp)
  })

  return (
    <AceEditor
      mode="java"
      theme="github"
      name="hello"
      value={snippet}
      onChange={onChange}
    />
  )
}

export default Editor
