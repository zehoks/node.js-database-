const obj = {
    first: 1,
    second: 2,
}
const firstA = obj.first
const secondA = obj.second
console.log(firstA)
console.log(secondA)

const { first: firstSL, second } = obj
console.log(firstSL)
console.log(second)

console.log(process.env)
