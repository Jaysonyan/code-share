import TextDocument from "./textdocument"
import Character from "./character"
const MAX_INDEX = 10

class CRDT {

  constructor() {
    this.document = new TextDocument()
  }

  sendInsert(char, pos) {
    let newIndex = this.getIndexFromPos(pos)
    let newChar = new Character(char, newIndex)
    this.document.insertChar(newChar)
    // Emit char
  }

  sendDelete(pos) {
    let deletedChar = this.document.getChar(pos.row, pos.column)
    this.document.deleteChar(deletedChar)
    // Emit char
  }

  receiveInsert(character) {
    this.document.insertChar(character)
  }

  receiveDelete(character) {
    this.document.deleteChar(character)
  }

  getIndexFromPos(pos) {
    let { row, column } = pos

    let leftIdx = this.document.getLeftChar(row, column).relativeIndex || []
    let rightIdx = this.document.getRightChar(row, column).relativeIndex || []
    let returnIdx = []

    let i = 0
    while(leftIdx[i] && rightIdx[i] && leftIdx[i] === rightIdx[i]) {
      returnIdx.push(leftIdx[i])
      i++
    }
    if (!leftIdx[i]) {
      if (rightIdx[i] === 1) {
        returnIdx.concat([0, MAX_INDEX/2])
      } else {
        returnIdx.push(rightIdx[i]/2)
      }
    } else if (!rightIdx[i]) {
      returnIdx.push(rightIdx+1)
    } else {
      if (rightIdx[i] - leftIdx[i] === 1) {
        returnIdx.concat([leftIdx[i], MAX_INDEX/2])
      } else {
        returnIdx.push((leftIdx[i] + rightIdx[i])/2)
      }
    }
    return returnIdx
  }

  toText() {
    return this.document.getString()
  }
}

export default CRDT
