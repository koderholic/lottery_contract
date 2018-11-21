// Test for:
// Ensure that the choosen player gets paid completely on calling the pickWinner function  
//     - Ensure only manager calls this
//     - ensure the winner account gets increased
//     - ensure the contract balance is empty after this call
//     - ensure the players variable is initialized to empty
// Players can enter the lottery
//     - Ensure after the enter function is called the players length increases and the last player added to the array is same as the msg.sender
//     - ensure the players do not contain the manager address
//     - ensure player do not join with amount 


const assert = require('assert')
const ganache = require('ganache-cli')
const provider = ganache.provider()
const Web3 = require('web3')
const web3 = new Web3(web3.givenProvider || provider)
const {interface, bytecode} = require('../contracts/lottery.sol')

var accounts
var contract
beforeEach (() => {
    accounts = web3.eth.getAccounts()
    contract = new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({from: accounts[0], gas: '1000000'})
    console.log(accounts)
})

describe ('Players can enter the lottery successfully', () => {

})