import React, { useState } from "react"
import AceEditor from "react-ace"
import socket from "../socket/socket"
import CRDT from "./crdt"

const Editor = () => {
  const [code, updateCode] = useState("")
  const serverSocket = socket()
  const crdt = new CRDT()

  const onChange = (newVal, event) => {
    serverSocket.emitInsert(newVal)
    event.lines.forEach((line, rowOffset) => {
      line.split("").forEach((char, colOffset) => {
        let pos = {
          row: event.start.row + rowOffset,
          column: event.start.column + colOffset
        }
        switch(event.action) {
          case "insert":
            crdt.sendInsert(char, pos)
            break
          case "delete":
            crdt.sendDelete(char, pos)
            break
        }
      })
    })
    updateCode(crdt.toText())
  }

  serverSocket.handleInsert((insertOp) => {
    updateCode(insertOp)
  })

  return (
    <AceEditor
      mode="java"
      theme="github"
      name="hello"
      value={code}
      onChange={onChange}
    />
  )
}

export default Editor
