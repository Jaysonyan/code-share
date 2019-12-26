class Document {
  constructor() {
    this.text = [[]]
  }

  getChar(row, col) {
    return this.text[row][column]
  }

  insertChar(character) {
    let { row, column } = getPosOfChar(character)
    if (character.value === '\n') {
      let newLine = this.text[row].splice(column)
      this.text.splice(row, 0, newLine)
    }
    this.text[row].splice(column, 0, character)
  }

  deleteChar(startPos, endPos) {
    let rowDiff = endPos.row - startPos.row - 1
    this.text.splice(startPos + 1, rowDiff)
  }

  getLeftChar({row, col}) {
    if (row === 0 && column === 0) {
      return []
    }
    row -= column === 0 ? 1 : 0
    return this.text[row][column]
  }

  getRightChar({row, col}) {
    let numRows = this.text.length
    let numCols = this.text[row].length
    if (row > numRows) { //created a newline at EOF
      return []
    } else if (column === numCols) { //if inserted char is at EOL
      if (row === numRows) {
        return []
      } else {
        row += 1
        column = 0
      }
    }
    return this.text[row][column].relativeIndex
  }

  getPosOfChar(char) {
    let row = binarySearchText(this.text, char, (arrayVal, val) => {
      if (arrayVal.length === 0) {
        return 0
      }
      return arrayVal[0].greaterThan(char) ? 1 : arrayVal[arrayVal.length-1].greaterThan(char) ? -1 : 0
    })
    let column = binarySearchText(this.text[row], char, (arrayVal, val) => (
      arrayVal.equalTo(val) ? 0 : arrayVal.greaterThan(val) ? 1 : -1
    ))
    return { row, column }
  }
}
