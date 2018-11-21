const solc = require('solc')
const  path = require('path')
const fs = require('fs')

const pathToContract = path.join(__dirname,'../contracts','lottery.sol')
const contract = fs.readFileSync(pathToContract, 'utf8')

const compiled = solc.compile(contract, 1)

console.log(compiled)

module.exports = compiled
