const MAX_INDEX = 10

class CRDT {
  constructor() {
    this.document = new Document()
  }

  sendInsert(pos, char) {
    let newIndex = getIndexFromPos(pos)
    let newChar = { char: char, relativeIndex: newIndex }
    console.log(newChar)
  }

  sendDelete(startPos, endPos) {

  }

  receiveInsert(character) {
    this.document.insertChar(character)
  }

  receiveDelete(pos) {
  }

  getIndexFromPos(pos) {
    let { row, column } = pos

    let leftIdx = this.document.getLeftChar(pos)
    let rightIdx = this.document.getLeftChar(pos)
    let returnIdx = []

    let i = 0
    while(leftIdx[i] && rightIdx[i] && leftIdx[i] === rightIdx[i]) {
      returnIdx.push(leftIdx[i])
      i++
    }
    if (!leftChar[i]) {
      if (rightIdx[i] === 1) {
        returnIdx.concat([0, MAX_INDEX/2])
      } else {
        returnIdx.push(rightIdx[i]/2)
      }
    } else if (!rightChar[i]) {
      returnIdx.push(rightIdx+1)
    } else {
      if (rightChar[i] - leftChar[i] === 1) {
        returnIdx.concat([leftIdx[i], MAX_INDEX/2])
      } else {
        returnIdx.push((leftIdx[i] + rightIdx[i])/2)
      }
    }
    return returnIdx
  }

  toText() {
    return this.text.map(character => character.char).reduce((text, char) => text+char)
  }
}
