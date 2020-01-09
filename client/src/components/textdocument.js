import { binarySearchText } from "./utils"

class TextDocument {

  constructor() {
    this.text = [[]]
  }

  getString() {
    return this.text.map(line => line.map(char => char.value).join("")).join("")
  }

  getChar(row, column) {
    return this.text[row][column]
  }

  insertChar(character) {
    let { row, column } = this.getPosOfChar(character)
    if (character.value === '\n') {
      let newLine = this.text[row].splice(column)
      this.text.splice(row, 0, newLine)
    }
    this.text[row].splice(column, 0, character)
  }

  deleteChars(startPos, endPos) {
    let rowDiff = Math.max(0, endPos.row - startPos.row - 1)
    this.text.splice(startPos + 1, rowDiff)
    if (startPos.row === endPos.row) {
      let colDiff = startPos.column - endPos.column
      this.text.splice(startPos.column, colDiff)
    } else {
      this.text.splice(startPos.column)
      this.text.splice(0, endPos.column)
    }
  }

  deleteChar(character) {
    let { row, column } = this.getPosOfChar(character)
    if (character.value === '\n') {
      let nextLine = this.text[row+1]
      this.text.splice(row+1, 1)
      this.text[row] = this.text[row].concat(nextLine)
    }
    this.text[row].splice(column, 1)
  }

  getLeftChar(row, column) {
    if (row === 0 && column === 0) {
      return []
    }
    if (column === 0) {
      row -= 1
      column = this.text[row].length - 1
    } else {
      column -= 1
    }
    return this.text[row][column]
  }

  getRightChar(row, column) {
    let numRows = this.text.length
    let numCols = this.text[row].length
    if (row === numRows) { //created a newline at EOF
      return []
    } else if (column === numCols) { //if inserted char is at EOL
      if (row === numRows-1) {
        return []
      } else {
        row += 1
        column = 0
      }
    } else {
      column += 1
    }
    return this.text[row][column]
  }

  getPosOfChar(char) {
    let row = binarySearchText(this.text, char, (arrayVal, val) => {
      if (arrayVal.length === 0) {
        return 0
      }
      return arrayVal[0].greaterThan(val) ? 1 : arrayVal[arrayVal.length-1].greaterThan(val) ? -1 : 0
    })
    let column = binarySearchText(this.text[row], char, (arrayVal, val) => {
      return arrayVal.equalTo(val) ? 0 : arrayVal.greaterThan(val) ? 1 : -1
    })
    return { row, column }
  }
}

export default TextDocument
