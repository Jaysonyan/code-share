class Character {
  constructor(value, relativeIndex, siteId="a") {
    this.value = value
    this.relativeIndex = relativeIndex
    this.siteId = siteId
  }

  greaterThan(otherCharacter) {
    let localIndex = this.relativeIndex
    let otherIndex = otherCharacter.relativeIndex
    let i = 0
    while(localIndex[i] && otherIndex[i] && localIndex[i] === otherIndex[i]) {
      i++
    }
    if (!localIndex[i] && !this.relativeIndex[i]) {
      return this.siteId > otherCharacter.siteId
    } else {
      return !!localIndex[i]
    }
  }

  equalTo(otherCharacter) {
    if (otherCharacter.relativeIndex !== this.relativeIndex) {
      return false
    }
    this.relativeIndex.forEach((val, i) => {
      if (val !== otherCharacter.relativeIndex[i]) {
        return false
      }
    })
    return true
  }
}

export default Character
