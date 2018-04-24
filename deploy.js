//To connect to rinkeby network (target network) we use this module
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
//by connecting to wallet provider using 12 word mnemonic we get all the keys (private, public) as well
//as address
//--------------------------------------------------------------------------
//infura.io
//-----------------------------------------------------------------------------
//We use rinkeby link from infura to connect to rinkeby network
const provider = new HDWalletProvider('mercy piano turtle leg hawk gym purity cover lazy sure agent convince', 'https://rinkeby.infura.io/ZW1iSxvmiUF9b9KLCIhC');
const web3 = new Web3(provider);
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from accounts 0 ' + accounts[0])
    const result = await new web3.eth.Contract(JSON.parse(interface)).
        deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ gas: 1000000, from: accounts[0] });
    console.log('contract is deployed ' + result.options.address);
}
deploy();