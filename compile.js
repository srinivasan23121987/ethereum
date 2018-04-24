const path = require('path');
const fs = require('fs');
const solc = require('solc');
//file cannot be directly compiled in nodjs instead readfile and then take refr
//of solidity compiler which we will get bytecode and ABI
const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, 'utf8');
module.exports = solc.compile(source, 1).contracts[":Inbox"]