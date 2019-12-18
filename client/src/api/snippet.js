import { sendRequest } from "./request"

const getCodeSnippet = (room) => sendRequest("snippet", "GET")

export {
  getCodeSnippet
}
