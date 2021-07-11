const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3('https://rpc-mumbai.matic.today');
const ethers = require('ethers');
const keeper = require('../client/src/contracts/CatanKeeper.json');

const loadWallet = async() => {
  const mnemonic = fs.readFileSync('../.secret', 'utf8');
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  web3.eth.accounts.wallet.add(wallet);
  console.info(`Wallet ${web3.eth.accounts.wallet[0].address} loaded`)
  return web3.eth.accounts.wallet[0].address;
}

loadWallet().then(async address => {
  const smartContract = new web3.eth.Contract(keeper.abi, keeper.networks[80001].address);
  await smartContract.methods.recordTwoPlayerGame({
    player_1: '0x5Ba751Cd8D8901f5C003d9452264Fba5A0d73bEa',
    player_2: '0x9A2b809461f7F90e55619b8068Df0AF8eAE5c456',
    player_1_vp: 10,
    player_2_vp: 9,
    variation: 'Base'
  }).send({
    from: address,
    gasLimit: 10000000
  })

  //Check num of 2 player games
  const numGames = await smartContract.methods.twoPlayerGameId().call();
  console.info('# 2 Player Games:', numGames);

  //Get latest recorded game
  const game = await smartContract.methods.recordedTwoPlayerGames(numGames - 1).call();
  console.info(game);
});





