var bip39 = require('bip39')
const HDWallet = require('truffle-hdwallet-provider')
const Web3 = require('web3')

const mnemonics = 'phrase polar hunt isolate general gloom cram chat crawl report found render'

const provider = new HDWallet(mnemonics, 'https://rinkeby.infura.io/afn70dBlA0QivCgkPipn')
const web3 = new Web3(Web3.givenProvider || provider)
const {interface, bytecode} = require('../deploy/compile.js')


//Get all accounts
var contract
async function deploy () {
    try {
        const accounts = await web3.eth.getAccounts()
        console.log('accounts',accounts)
        contract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode})
        .send({from: accounts[0], gas:'6500000'})
        console.log(contract.options.address)
    } catch (error) {
        console.log('the error', error)
    }
}

deploy()
module.exports = contract