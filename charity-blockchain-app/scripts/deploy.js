const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('../build/Charity.json'); // Adjust the path as necessary

const provider = new HDWalletProvider(
  'your mnemonic here', // Replace with your wallet mnemonic
  'https://your.ethereum.node.url' // Replace with your Ethereum node URL
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  
  console.log('Deploying from account:', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to:', result.options.address);
  
  provider.engine.stop();
};

deploy();