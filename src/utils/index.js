export const generatorArray = (length = -1, max = 12, canRepeat = false) => {
  length = length < 0 ? parseInt(Math.random() * 7) + 5 : length
  if (max < length && !canRepeat) {
    throw new Error('max number must be grate then length')
  }
  const array = []
  while (length > 0) {
    const value = parseInt(Math.random() * max) + 1
    if (array.indexOf(value) < 0 && !canRepeat) {
      array.push(value)
      length--
    } else if (canRepeat) {
      array.push(value)
      length--
    }
  }
  return array
}

export const wait = async (timeout) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}
