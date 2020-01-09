function binarySearchText(array, val, compareFcn) {
  let start = 0
  let end = array.length - 1
  while(start < end) {
    let middle = Math.floor((start + end)/2)
    let middleLine = array[middle]
    switch(compareFcn(middleLine, val)) {
      case -1:
        start = middle + 1
        break
      case 1:
        end = middle - 1
        break
      case 0:
        return middle
    }
  }
  return start //Shouldn't ever reach here..?
}

export {
  binarySearchText
}
