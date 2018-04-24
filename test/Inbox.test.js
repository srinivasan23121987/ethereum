const assert = require('assert');
//ganache cli local test network automatically attach providers to connect to network
const ganache = require('ganache-cli');
//web3 module can be used to communicate to deployed contracts using javascript ABI
const Web3 = require('web3');
var events = require('events');
const emitter = new events.EventEmitter();
const INITIAL_STRING = 'Hi There!';
process.setMaxListeners(Infinity);
emitter.setMaxListeners(Infinity)
const web3 = new Web3(ganache.provider());
//Bytecode - Compiled Contract interface - to communicate
const { interface, bytecode } = require('../compile');
let accounts;
let inbox;
beforeEach(async () => {
    //Get list of all accounts
    accounts = await web3.eth.getAccounts();
    //Use one of those accounts to deploy contract
    //In web3.eth.Contract we pass javascript ABI interface, we deploy the bytecode 
    //and initial message (arguments), we have to indicate the account so this account
    //will be charged for deploying contract, we have send maximum gas limit for this transaction
    inbox = await new web3.eth.Contract(JSON.parse(interface)).
        deploy({ data: bytecode, arguments: [INITIAL_STRING] })
        .send({ from: accounts[0], gas: '1000000' })
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        //After contract is deployed we get the address of the deployed contract
        assert.ok(inbox.options.address);
    })
    it('has a default message', async () => {
        //Reading the message value which is as function in contract which may be
        //default value of already set value, to get value no cost...but if we update
        //it will charge
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING)
    })
    it('Can change message', async () => {
        //If we want to change the message value we have to send our account details
        //in the transaction, this transaction will be charged
        await inbox.methods.setMessage("who are you?").send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, "who are you?")
    })
})

// //Testing
// class Car {
//     park() {
//         return "Stopped";
//     }
//     drive() {
//         return "vroom";
//     }

// }
// let car;
// beforeEach(() => {
//     car = new Car();
// })

// describe('Car Class', () => {
//     it('Park', () => {
//         assert.equal(car.park(), "Stopped")
//     })
//     it('candrive', () => {
//         assert.equal(car.drive(), "vroom")
//     })
// })