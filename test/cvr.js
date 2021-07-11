const fs = require('fs');
const Web3 = require('web3');
const ethers = require('ethers');
const cvr = require('../client/src/contracts/CatanstitutionVotingRights.json');

const web3 = new Web3('https://rpc-mumbai.matic.today')
const CVR = new web3.eth.Contract(cvr.abi, cvr.networks[80001].address);

const loadWallet = async() => {
  const mnemonic = fs.readFileSync('../.secret', 'utf8');
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  web3.eth.accounts.wallet.add(wallet);
  console.info(`Wallet ${web3.eth.accounts.wallet[0].address} loaded`)
  return web3.eth.accounts.wallet[0].address;
}

const mint = async (address, amount) => {
  try {
    await CVR.methods.mint(address, amount).send({
      from: address,
      gasLimit: 10000000
    });
    console.info(`${amount} CVR minted to ${address}`);
  } catch(e) {
    console.error(e);
  }
}

const checkRoles = async (address) => {
  const minterRole = await CVR.methods.KEEPER_OF_THE_CATANSTITUTION().call();
  if(await CVR.methods.hasRole(minterRole, address).call()){
    console.info('Has KEEPER_OF_THE_CATANSTITUTION role');
  }

  const chairmanRole = await CVR.methods.RULER_OF_CATAN().call();
  if(await CVR.methods.hasRole(chairmanRole, address).call()){
    console.info('Has RULER_OF_CATAN role');
  }
}

loadWallet().then(async address => {
  await checkRoles(address);
  // await mint(address, web3.utils.toWei('1','ether'));
}).catch(e => {
  console.error(e);
});


