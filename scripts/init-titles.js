const fs = require('fs');
const Web3 = require('web3');
const ethers = require('ethers');
const FluidVoteTitle = require('../client/src/contracts/FluidVoteTitle.json');
const Catanstitution = require('../client/src/contracts/Catanstitution.json');
const VoterPool = require('../client/src/contracts/VoterPool.json');

const web3 = new Web3('http://localhost:7545')
const catanstitution = new web3.eth.Contract(
    Catanstitution.abi,
    Catanstitution.networks[1337].address);

const loadWallet = async() => {
  const mnemonic = fs.readFileSync('../.secret', 'utf8');
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  web3.eth.accounts.wallet.add(wallet);
  console.info(`Wallet ${web3.eth.accounts.wallet[0].address} loaded`)
  return web3.eth.accounts.wallet[0].address;
}

loadWallet().then(async address => {
  const voterPoolAddress = await (await catanstitution.methods.voterPool.call()).call();
  const rulerOfCatanAddress = await (await catanstitution.methods.rulerOfCatan.call()).call();
  const keeperOfTheCatanstitutionAddress = await (await catanstitution.methods.keeperOfTheCatanstitution.call()).call();

  const voterPool = new web3.eth.Contract(VoterPool.abi, voterPoolAddress);
  const registrationManager = await voterPool.methods.REGISTRATION_MANAGER().call();
  await voterPool.methods.grantRole(registrationManager, Catanstitution.networks[1337].address).send({
    from: address,
    gasLimit: 500000
  });

  const rulerOfCatan = new web3.eth.Contract(FluidVoteTitle.abi, rulerOfCatanAddress);
  let titleOperator = await rulerOfCatan.methods.TITLE_OPERATOR().call();
  await rulerOfCatan.methods.grantRole(titleOperator, Catanstitution.networks[1337].address).send({
    from: address,
    gasLimit: 500000
  });

  const keeperOfTheCatanstitution = new web3.eth.Contract(FluidVoteTitle.abi, keeperOfTheCatanstitutionAddress);
  titleOperator = await keeperOfTheCatanstitution.methods.TITLE_OPERATOR().call();
  await keeperOfTheCatanstitution.methods.grantRole(titleOperator, Catanstitution.networks[1337].address).send({
    from: address,
    gasLimit: 500000
  });

  console.log('Catanstitution titles initialized');
}).catch(e => {
  console.error(e);
});


