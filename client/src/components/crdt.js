const MAX_INDEX = 10

class CRDT {
  constructor() {
    this.pageText = []
  }

  sendInsert(pos, char) {
    let newIndex = getIndexFromPos(pos)
    let newChar = { char: char, relativeIndex: newIndex }
    console.log(newChar)
  }

  sendDelete(position) {
  }

  receiveInsert() {
  }

  receiveDelete(pos) {
  }

  insertChar(character, {row, column}) {
  }

  getPosFromIndex(index) {
  }

  getIndexFromPos(pos) {
    let { row, column } = pos

    let leftIdx = getLeftIndex(pos)
    let rightIdx = getRightIndex(pos)
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

  getLeftIndex({row, column}) {
    if (row === 0 && column === 0) {
      return []
    }
    row -= column === 0 ? 1 : 0
    return this.pageText[row][column].relativeIndex
  }

  getRightIndex({row, column}) {
    let numRows = this.pageText.length
    let numCols = this.pageText[row].length
    if (row > numRows) { //created a newline at EOF
      return []
    } else if (column === numCols) { //If inserted char is at EOL
      if (row === numRows) {
        return []
      } else {
        row += 1
        column = 0
      }
    }
    return this.pageText[row][column].relativeIndex
  }

  toText() {
    return this.text.map(character => character.char).reduce((text, char) => text+char)
  }
}

/*
 * Text -> Array of text objects
 *
 * insertObj {
 (* char
 * relative index
 * }
 *
 * deleteObj {
 * relative index
 * }
 *
 * 1, 2, 3
 * 1, [1, 5], 2, 3
 * 1, [1, 3], [1, 5], 2, 3
 * 1, [1, 3], [1, 5], [1, 7], 2, 3
 *
*/
