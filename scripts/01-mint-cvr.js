const fs = require('fs');
const Web3 = require('web3');
const ethers = require('ethers');
const Catanstitution = require('../client/src/contracts/Catanstitution.json');
const addresses = require("./voters.json");

const web3 = new Web3('https://rpc-mumbai.matic.today')
const catanstitution = new web3.eth.Contract(
    Catanstitution.abi,
    Catanstitution.networks[80001].address);

const loadWallet = async() => {
  const mnemonic = fs.readFileSync('../.secret', 'utf8');
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  web3.eth.accounts.wallet.add(wallet);
  console.info(`Wallet ${web3.eth.accounts.wallet[0].address} loaded`)
  return web3.eth.accounts.wallet[0].address;
}

loadWallet().then(async address => {
  for(const user in addresses){
    if(addresses.hasOwnProperty(user)) {
      await catanstitution.methods.mintVoterToken(addresses[user], 1).send({
        from: address,
        gasLimit: 500000
      });
    }
  }

  console.log('CVR distributed');
}).catch(e => {
  console.error(e);
});


