const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

//Constants
const A_RATIO = 16807
const B_RATIO = 48271
const DIVIDE_BY = 2147483647
const ITERATIONS = 1000000

/**
 * Get initial values for A and B from console
 */
readline.question(`Iveskite skaiciu A: `, a => {
  readline.question(`Iveskite skaiciu B: `, b => {
    let A = numberGenerator(a, A_RATIO, DIVIDE_BY, ITERATIONS)
    let B = numberGenerator(b, B_RATIO, DIVIDE_BY, ITERATIONS)
    console.log(compareArraysOfValues(A, B, ITERATIONS))
    readline.close()
  })
})

/**
 * Compares 2 arrays values last 8 bits side by side and returns
 * how many matches were found
 * @param {Array} a
 * @param {Array} b
 * @param {Number} iterations
 */
function compareArraysOfValues(a, b, iterations) {
  let matchesFound = 0
  for (let i = 0; i < ITERATIONS; i++) {
    if ((a[i] & 0xff) === (b[i] & 0xff)) {
      //using AND bitwise operator it cuts last 8 bits of the base 2
      matchesFound++
    }
  }
  return matchesFound
}

/**
 * Generates an array of numbers based on the parameters entered.
 * @param {Number} initialNumber
 * @param {Number} multiplyBy
 * @param {Number} divideBy
 * @param {Number} iterations
 */
function numberGenerator(initialNumber, multiplyBy, divideBy, iterations) {
  let numArray = []
  for (let i = 0; i < iterations; i++) {
    numArray.push(
      ((i === 0 ? initialNumber : numArray[i - 1]) * multiplyBy) % divideBy
    )
  }
  return numArray
}
